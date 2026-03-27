package com.example.orderservice.model;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDocument {
    private String productId;
    private Integer quantity;
    private BigDecimal price;
}