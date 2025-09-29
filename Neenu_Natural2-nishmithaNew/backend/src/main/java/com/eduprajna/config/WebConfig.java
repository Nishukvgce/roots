package com.eduprajna.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${allowed.origins:http://localhost:3000,http://127.0.0.1:3000}")
    private String allowedOrigins;

    @Value("${spring.servlet.multipart.location:C:/Users/nishm/uploads}")
    private String uploadLocation;

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        // Serve files from upload location at /uploads/** URL pattern
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadLocation + "/");
    }

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns(allowedOrigins.split(","))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
