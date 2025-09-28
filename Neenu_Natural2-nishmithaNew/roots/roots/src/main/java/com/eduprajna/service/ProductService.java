package com.eduprajna.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eduprajna.entity.Product;
import com.eduprajna.repository.CartItemRepository;
import com.eduprajna.repository.OrderItemRepository;
import com.eduprajna.repository.ProductRepository;
import com.eduprajna.repository.WishlistItemRepository;


@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private WishlistItemRepository wishlistItemRepository;
    
    public List<Product> getAll() { return productRepository.findAll(); }
    public Product save(Product p) { return productRepository.save(p); }
    
    @Transactional
    public void delete(Long id) { 
        // First find the product
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            // Delete all related entities first to avoid foreign key constraint violations
            cartItemRepository.deleteByProduct(product);
            orderItemRepository.deleteByProduct(product);
            wishlistItemRepository.deleteByProduct(product);
            
            // Now delete the product itself
            productRepository.deleteById(id);
        }
    }
    
    public Product getById(Long id) { return productRepository.findById(id).orElse(null); }
    
}