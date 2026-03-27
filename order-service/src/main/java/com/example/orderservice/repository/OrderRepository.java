package com.example.orderservice.repository;

import com.example.orderservice.model.OrderDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<OrderDocument, String> {
    List<OrderDocument> findByUserId(String userId);
}