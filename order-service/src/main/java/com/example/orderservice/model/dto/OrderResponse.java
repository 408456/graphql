package com.example.orderservice.model.dto;

import com.example.orderservice.model.OrderStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@Builder
public class OrderResponse {
    private String id;
    private String  userId;
    private OrderStatus status;
    private BigDecimal totalAmount;
    private Instant createdAt;
    private Instant updatedAt;
    private List<OrderItemResponse> items;
}