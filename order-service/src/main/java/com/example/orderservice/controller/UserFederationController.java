package com.example.orderservice.controller;

import com.example.orderservice.federation.UserReference;
import org.springframework.graphql.data.federation.EntityMapping;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class UserFederationController {

    @EntityMapping
    public UserReference user(@Argument Map<String, Object> representation) {
        String id = (String) representation.get("id");
        return new UserReference(id);
    }
}
