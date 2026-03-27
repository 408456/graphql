package com.example.orderservice.controller;

import com.example.orderservice.federation.UserReference;
import com.example.orderservice.model.dto.CreateOrderRequest;
import com.example.orderservice.model.dto.OrderResponse;
import com.example.orderservice.model.dto.UpdateOrderStatusRequest;
import com.example.orderservice.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class OrderGraphQLController {

    private final OrderService orderService;

    @QueryMapping
    public OrderResponse order(@Argument String id) {
        return orderService.getOrder(id);
    }

    @QueryMapping
    public List<OrderResponse> orders() {
        return orderService.getAllOrders();
    }

    @QueryMapping
    public List<OrderResponse> ordersByUser(@Argument String userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @MutationMapping
    public OrderResponse createOrder(@Argument @Valid CreateOrderRequest input) {
        return orderService.createOrder(input);
    }

    @MutationMapping
    public OrderResponse updateOrderStatus(@Argument String id, @Argument @Valid UpdateOrderStatusRequest input) {
        return orderService.updateOrderStatus(id, input);
    }

    @MutationMapping
    public Boolean deleteOrder(@Argument String id) {
        orderService.deleteOrder(id);
        return true;
    }

    @SchemaMapping(typeName = "User", field = "orders")
    public List<OrderResponse> orders(UserReference user) {
        return orderService.getOrdersByUserId(user.getId());
    }
}