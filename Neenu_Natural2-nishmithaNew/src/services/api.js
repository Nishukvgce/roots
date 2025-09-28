import axios from 'axios';

// Base URL from environment variables (Vite uses import.meta.env)
const baseURL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor: attach auth token if present
apiClient.interceptors.request.use(
  (config) => {
    try {
      // Check for admin user token first (for admin panel operations)
      const storedAdminUser = localStorage.getItem('adminUser');
      let token = null;
      
      if (storedAdminUser) {
        const adminUser = JSON.parse(storedAdminUser);
        token = adminUser?.token || adminUser?.accessToken;
      }
      
      // Fall back to regular user token if admin token not found
      if (!token) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          token = user?.token || user?.accessToken;
        }
      }
      
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // Ignore JSON parse errors; proceed without token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // Unauthorized: clear session and optionally redirect to login
      try {
        localStorage.removeItem('user');
      } catch {}
      // Lightweight redirect guard to avoid breaking SSR/testing
      if (typeof window !== 'undefined') {
        const current = window.location.pathname + window.location.search;
        const loginUrl = `/user-login?from=${encodeURIComponent(current)}`;
        // Avoid redirect loops
        if (!window.location.pathname.includes('/user-login')) {
          window.location.replace(loginUrl);
        }
      }
    }

    // Optional: centralized logging
    if (import.meta.env?.MODE !== 'production') {
      // eslint-disable-next-line no-console
      console.error('API Error:', {
        url: error?.config?.url,
        method: error?.config?.method,
        status: error?.response?.status,
        data: error?.response?.data
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;


