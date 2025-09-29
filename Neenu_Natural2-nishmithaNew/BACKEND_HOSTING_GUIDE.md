# Backend & Database Hosting Guide

## Backend Analysis Summary

Your Spring Boot backend has the following characteristics:

### **Technology Stack:**
- **Framework**: Spring Boot 3.5.5
- **Java Version**: Java 21
- **Database**: MySQL 8
- **Build Tool**: Maven
- **Dependencies**: Spring Web, Spring Data JPA, MySQL Connector, Validation

### **API Endpoints:**
- **Admin Products**: `/api/admin/products` (CRUD operations)
- **Public Categories**: `/api/categories` (read-only)
- **Cart Management**: `/api/cart`
- **User Authentication**: `/api/auth`
- **Wishlist**: `/api/wishlist`
- **Orders**: `/api/orders`
- **Image Serving**: `/api/admin/products/images/{filename}`

### **Current Configuration Issues:**
1. **Hardcoded Database URL**: Points to localhost MySQL
2. **File Upload Path**: Hardcoded to `C:/Users/nishm/uploads`
3. **CORS**: Currently allows only localhost:3000

---

## 🚀 Hosting Options

### **Option 1: Railway.app (Recommended - Easiest)**

Railway is perfect for Spring Boot applications with automatic MySQL setup.

#### **Steps:**

1. **Create Railway Account**: Go to [railway.app](https://railway.app)

2. **Deploy Backend**:
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Navigate to backend directory
   cd backend
   
   # Initialize Railway project
   railway init
   
   # Deploy
   railway up
   ```

3. **Add MySQL Database**:
   - In Railway dashboard → Add Service → Database → MySQL
   - Railway automatically provides connection variables

4. **Configure Environment Variables** in Railway dashboard:
   ```properties
   SPRING_DATASOURCE_URL=${{MySQL.DATABASE_URL}}
   SPRING_DATASOURCE_USERNAME=${{MySQL.MYSQL_USER}}
   SPRING_DATASOURCE_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
   SPRING_DATASOURCE_DATABASE=${{MySQL.MYSQL_DATABASE}}
   SPRING_JPA_HIBERNATE_DDL_AUTO=update
   SPRING_SERVLET_MULTIPART_LOCATION=/tmp/uploads
   ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:3000
   ```

---

### **Option 2: Render.com (Good Free Tier)**

Render offers free PostgreSQL and web services (with limitations).

#### **Steps:**

1. **Create Render Account**: Go to [render.com](https://render.com)

2. **Deploy Database**:
   - Create new PostgreSQL database (free tier available)
   - Note the connection details

3. **Deploy Backend**:
   - Connect your GitHub repository
   - Select "backend" as root directory
   - Build Command: `./mvnw clean package -DskipTests`
   - Start Command: `java -jar target/roots-0.0.1-SNAPSHOT.jar`

4. **Environment Variables**:
   ```properties
   SPRING_DATASOURCE_URL=jdbc:postgresql://your-db-host:5432/your-db-name
   SPRING_DATASOURCE_USERNAME=your-username
   SPRING_DATASOURCE_PASSWORD=your-password
   SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver
   SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.PostgreSQLDialect
   SPRING_JPA_HIBERNATE_DDL_AUTO=update
   SPRING_SERVLET_MULTIPART_LOCATION=/tmp/uploads
   ```

---

### **Option 3: Heroku (Reliable but Paid)**

Classic Java hosting platform with excellent documentation.

#### **Steps:**

1. **Install Heroku CLI**: Download from [devcenter.heroku.com](https://devcenter.heroku.com/articles/heroku-cli)

2. **Create Application**:
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Login to Heroku
   heroku login
   
   # Create app
   heroku create your-app-name
   
   # Add PostgreSQL addon
   heroku addons:create heroku-postgresql:mini
   
   # Deploy
   git subtree push --prefix backend heroku main
   ```

3. **Environment Variables**:
   ```bash
   heroku config:set SPRING_JPA_HIBERNATE_DDL_AUTO=update
   heroku config:set SPRING_SERVLET_MULTIPART_LOCATION=/tmp/uploads
   ```

---

## 📋 Required Backend Code Changes

Before deploying, you need to make these configuration changes:

### **1. Create Production Application Properties**

Create `backend/src/main/resources/application-prod.properties`:

```properties
# Database Configuration (will be overridden by environment variables)
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:mysql://localhost:3306/roots}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:root}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:}
spring.datasource.driver-class-name=${SPRING_DATASOURCE_DRIVER_CLASS_NAME:com.mysql.cj.jdbc.Driver}

# JPA Configuration
spring.jpa.hibernate.ddl-auto=${SPRING_JPA_HIBERNATE_DDL_AUTO:update}
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=false
spring.jpa.database-platform=${SPRING_JPA_DATABASE_PLATFORM:org.hibernate.dialect.MySQL8Dialect}

# File Upload Configuration
spring.servlet.multipart.location=${SPRING_SERVLET_MULTIPART_LOCATION:/tmp/uploads}
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# Server Configuration
server.port=${PORT:8080}

# Logging Configuration
logging.level.com.eduprajna=INFO
logging.level.org.springframework.web=WARN
logging.level.org.hibernate.SQL=WARN
```

### **2. Update CORS Configuration**

Modify your controllers to accept production URLs. Create a configuration class:

`backend/src/main/java/com/eduprajna/config/WebConfig.java`:

```java
package com.eduprajna.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Value("${allowed.origins:http://localhost:3000}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns(allowedOrigins.split(","))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### **3. Add Public Product Endpoints**

Create `backend/src/main/java/com/eduprajna/Controller/PublicProductController.java`:

```java
package com.eduprajna.Controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.eduprajna.entity.Product;
import com.eduprajna.service.ProductService;

@RestController
@RequestMapping("/api/public/products")
@CrossOrigin
public class PublicProductController {
    
    private final ProductService productService;

    public PublicProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAll() {
        List<Product> products = productService.getAll().stream()
                .filter(p -> p.getIsActive() != null && p.getIsActive())
                .toList();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        Product p = productService.getById(id);
        if (p == null || !p.getIsActive()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(p);
    }
}
```

---

## 🗄️ Database Hosting Options

### **Option 1: Platform-Integrated (Recommended)**
- **Railway**: Automatic MySQL setup with your app
- **Render**: Free PostgreSQL database
- **Heroku**: PostgreSQL addon

### **Option 2: Dedicated Database Services**
- **PlanetScale**: MySQL-compatible, generous free tier
- **Supabase**: PostgreSQL with real-time features
- **MongoDB Atlas**: NoSQL option (requires code changes)

### **Option 3: Cloud Providers**
- **AWS RDS**: Professional grade, various engines
- **Google Cloud SQL**: MySQL/PostgreSQL hosting
- **Azure Database**: Microsoft's database service

---

## 🔄 Complete Deployment Workflow

### **1. Prepare Code**
```bash
# Apply the configuration changes above
# Commit changes
git add .
git commit -m "feat: add production configuration for deployment"
git push origin main
```

### **2. Deploy Backend (Railway Example)**
```bash
cd backend
railway init
railway up
# Add MySQL service in Railway dashboard
# Configure environment variables
```

### **3. Update Frontend**
Update your Vercel environment variables:
```
VITE_API_BASE_URL=https://your-railway-app.railway.app/api
```

### **4. Test Deployment**
- Test API endpoints: `https://your-backend-url.com/api/public/products`
- Test frontend connection to backend
- Verify database connectivity

---

## 💡 Recommendations

1. **Start with Railway**: Easiest setup with automatic database provisioning
2. **Use Environment Variables**: Never hardcode credentials
3. **Enable HTTPS**: All hosting platforms provide SSL certificates
4. **Monitor Resources**: Watch memory and CPU usage
5. **Set up Backups**: Regular database backups are crucial

Your backend is well-structured and ready for deployment with these configuration changes!