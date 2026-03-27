package com.example.orderservice.model.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class OrderItemResponse {
    private String  productId;
    private Integer quantity;
    private BigDecimal price;
}