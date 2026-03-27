package com.example.orderservice.model.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CreateOrderRequest {
        @NotNull
        private String  userId;

        @NotNull
        @Valid
        private List<OrderItemRequest> items;
}