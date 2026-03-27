package com.example.userservice.controller;



import com.example.userservice.model.dto.UserRequest;
import com.example.userservice.model.dto.UserResponse;
import com.example.userservice.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Validated
public class UserGraphQLController {
    private final UserService userService;

    @QueryMapping
    public UserResponse user(@Argument Long id) {
        return userService.getUser(id);
    }

    @QueryMapping
    public List<UserResponse> users() {
        return userService.getAllUsers();
    }

    @MutationMapping
    public UserResponse createUser(@Argument @Valid UserRequest input) {
        return userService.createUser(input);
    }

    @MutationMapping
    public UserResponse updateUser(@Argument Long id, @Argument @Valid UserRequest input) {
        return userService.updateUser(id, input);
    }

    @MutationMapping
    public Boolean deleteUser(@Argument Long id) {
        userService.deleteUser(id);
        return true;
    }
}
