package com.example.productservice.controller;

import com.example.productservice.model.dto.ProductRequest;
import com.example.productservice.model.dto.ProductResponse;
import com.example.productservice.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ProductGraphQLController {

    private final ProductService productService;

    @QueryMapping
    public ProductResponse product(@Argument Long id) {
        return productService.getProduct(id);
    }

    @QueryMapping
    public List<ProductResponse> products() {
        return productService.getAllProducts();
    }

    @MutationMapping
    public ProductResponse createProduct(@Argument @Valid ProductRequest input) {
        return productService.createProduct(input);
    }

    @MutationMapping
    public ProductResponse updateProduct(@Argument Long id, @Argument @Valid ProductRequest input) {
        return productService.updateProduct(id, input);
    }

    @MutationMapping
    public Boolean deleteProduct(@Argument Long id) {
        productService.deleteProduct(id);
        return true;
    }
}
