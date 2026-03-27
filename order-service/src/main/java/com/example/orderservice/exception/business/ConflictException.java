package com.example.orderservice.exception.business;

public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }
}
