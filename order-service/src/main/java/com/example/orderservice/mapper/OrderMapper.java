package com.example.orderservice.mapper;

import com.example.orderservice.model.OrderDocument;
import com.example.orderservice.model.OrderItemDocument;
import com.example.orderservice.model.dto.*;
import org.mapstruct.*;

import java.math.BigDecimal;
import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderResponse toResponse(OrderDocument order);

    List<OrderItemResponse> toItemResponseList(List<OrderItemDocument> items);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "totalAmount", expression = "java(calculateTotalAmount(request.getItems()))")
    OrderDocument toEntity(CreateOrderRequest request);

    default BigDecimal calculateTotalAmount(List<OrderItemRequest> items) {
        return items.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    OrderItemDocument toItemDocument(OrderItemRequest request);
}