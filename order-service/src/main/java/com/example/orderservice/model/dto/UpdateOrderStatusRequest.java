package com.example.orderservice.model.dto;

import com.example.orderservice.model.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateOrderStatusRequest {
    @NotNull
    private OrderStatus status;
}
