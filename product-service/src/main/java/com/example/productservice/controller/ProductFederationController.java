package com.example.productservice.controller;

import com.example.productservice.model.Product;
import com.example.productservice.service.ProductService;
import org.springframework.graphql.data.federation.EntityMapping;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class ProductFederationController {

    private final ProductService productService;

    public ProductFederationController(ProductService productService) {
        this.productService = productService;
    }

    @EntityMapping
    public Product product(@Argument Map<String, Object> representation) {
        Long id = Long.valueOf((String) representation.get("id"));
        return productService.getProductById(id);
    }
}