package com.example.productservice.exception.business;

public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }
}
