package com.example.orderservice.service;

import com.example.orderservice.exception.business.ResourceNotFoundException;
import com.example.orderservice.mapper.OrderMapper;
import com.example.orderservice.model.OrderDocument;
import com.example.orderservice.model.OrderStatus;
import com.example.orderservice.model.dto.CreateOrderRequest;
import com.example.orderservice.model.dto.OrderResponse;
import com.example.orderservice.model.dto.UpdateOrderStatusRequest;
import com.example.orderservice.repository.OrderRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        OrderDocument order = orderMapper.toEntity(request);
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(Instant.now());
        order.setUpdatedAt(Instant.now());

        OrderDocument saved = orderRepository.save(order);
        log.info("Created order with id: {}", saved.getId());
        return orderMapper.toResponse(saved);
    }

    public OrderResponse getOrder(String id) {
        OrderDocument order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        return orderMapper.toResponse(order);
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toResponse)
                .toList();
    }

    public List<OrderResponse> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(orderMapper::toResponse)
                .toList();
    }

    @Transactional
    public OrderResponse updateOrderStatus(String id, UpdateOrderStatusRequest request) {
        OrderDocument order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        order.setStatus(request.getStatus());
        order.setUpdatedAt(Instant.now());
        OrderDocument updated = orderRepository.save(order);
        log.info("Updated order status for id {} to {}", id, request.getStatus());
        return orderMapper.toResponse(updated);
    }

    @Transactional
    public void deleteOrder(String id) {
        if (!orderRepository.existsById(id)) {
            throw new ResourceNotFoundException("Order not found with id: " + id);
        }
        orderRepository.deleteById(id);
        log.info("Deleted order with id: {}", id);
    }
}