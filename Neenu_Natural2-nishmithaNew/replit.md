# Overview

This is a modern React-based e-commerce application called "Neenu's Natural Clone" - a natural products marketplace specializing in organic food items, herbal products, and health-conscious goods. The application features a comprehensive product catalog with categories including unpolished pulses/dals/rice, herbal soaps, skincare products, millet items, spices, and traditional snacks. Built with React 18 and modern frontend technologies, it provides a responsive shopping experience with features like product browsing, cart management, user authentication, and order processing through WhatsApp integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a modern React architecture with these key decisions:
- **React 18** with concurrent features for improved rendering performance
- **Vite** as the build tool for lightning-fast development and optimized production builds
- **Component-based architecture** with reusable UI components stored in `/src/components/` and page-specific components in `/src/pages/`
- **TailwindCSS** for utility-first styling with extensive color customization using CSS custom properties
- **Redux Toolkit** for predictable state management across the application
- **React Router v6** for declarative client-side routing

## Styling and Design System
- **Custom color palette** reflecting natural/organic branding with turmeric orange, cinnamon brown, and curry leaf green
- **Responsive design** using TailwindCSS breakpoints and container queries
- **Component styling** using class-variance-authority and clsx for dynamic class management
- **Typography** using Google Fonts (Inter, Source Sans Pro, Roboto, JetBrains Mono)

## Data Management
- **JSON-based data storage** with a local database.json file containing users, products, and orders
- **JsonDatabase class** providing an abstraction layer for data operations with methods for user authentication and product management
- **Mock data service** in dataService.js for simulating API calls during development
- **Redux store** for client-side state management of cart, user session, and UI state

## Authentication and Authorization
- **Role-based access control** with admin and customer roles
- **Local authentication** using the JsonDatabase class for credential validation
- **Supabase integration** configured for potential cloud authentication and database migration
- **Session management** through Redux store persistence

## Form Handling and Validation
- **React Hook Form** for efficient form state management and validation
- **Client-side validation** for user inputs and order processing
- **Address management** with support for multiple shipping addresses per user

## Business Integration
- **WhatsApp order processing** - orders are automatically formatted and sent to a configured WhatsApp number for fulfillment
- **Product catalog** organized by traditional Indian food categories matching the business domain
- **Inventory management** with stock tracking and availability status

# External Dependencies

## Core Framework Dependencies
- **React 18.2.0** - Main frontend framework with concurrent features
- **React DOM 18.2.0** - DOM rendering library for React
- **React Router DOM 6.0.2** - Client-side routing and navigation
- **Redux Toolkit 2.6.1** - State management with simplified Redux setup

## UI and Styling
- **TailwindCSS** - Utility-first CSS framework with custom color scheme
- **@tailwindcss/forms** - Enhanced form styling components  
- **Lucide React** - Icon library for consistent iconography
- **Framer Motion 10.16.4** - Animation library for smooth UI transitions
- **class-variance-authority** - Utility for conditional CSS classes
- **clsx** - Utility for constructing className strings

## Data and API Integration
- **Axios 1.8.4** - HTTP client for API requests
- **@supabase/supabase-js** - Configured for cloud database and authentication services
- **date-fns** - Date manipulation and formatting utilities
- **dotenv** - Environment variable management

## Form and Input Management
- **React Hook Form 7.55.0** - Efficient form handling and validation
- **React Helmet 6.1.0** - Document head management for SEO

## Development and Build Tools
- **Vite** - Fast build tool and development server
- **@vitejs/plugin-react** - Vite plugin for React support
- **vite-tsconfig-paths** - Path resolution for cleaner imports
- **PostCSS** with **Autoprefixer** - CSS processing and vendor prefixing

## Testing Framework
- **Jest** and **React Testing Library** - Configured for component and integration testing
- **@testing-library/jest-dom** - Custom matchers for testing DOM elements
- **@testing-library/user-event** - Utilities for simulating user interactions

## Business-Specific Integrations
- **WhatsApp Web API** - Order forwarding through formatted WhatsApp messages to phone number 7892783668
- **Rocket.new integration** - Deployment and hosting platform integration with critical dependencies management
- **@dhiwise/component-tagger** - Component identification and management system