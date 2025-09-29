package com.eduprajna.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getByCategory(@PathVariable String category) {
        List<Product> products = productService.getAll().stream()
                .filter(p -> p.getIsActive() != null && p.getIsActive())
                .filter(p -> p.getCategory() != null && p.getCategory().equalsIgnoreCase(category))
                .toList();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String q) {
        List<Product> products = productService.getAll().stream()
                .filter(p -> p.getIsActive() != null && p.getIsActive())
                .filter(p -> 
                    (p.getName() != null && p.getName().toLowerCase().contains(q.toLowerCase())) ||
                    (p.getDescription() != null && p.getDescription().toLowerCase().contains(q.toLowerCase())) ||
                    (p.getCategory() != null && p.getCategory().toLowerCase().contains(q.toLowerCase()))
                )
                .toList();
        return ResponseEntity.ok(products);
    }
}