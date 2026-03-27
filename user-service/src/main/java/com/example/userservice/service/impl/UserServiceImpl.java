package com.example.userservice.service.impl;


import com.example.userservice.exception.business.ConflictException;
import com.example.userservice.exception.business.ResourceNotFoundException;
import com.example.userservice.mapper.UserMapper;
import com.example.userservice.model.User;
import com.example.userservice.model.dto.UserRequest;
import com.example.userservice.model.dto.UserResponse;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public UserResponse createUser(UserRequest request) {
        try {
            User user = userMapper.toEntity(request);
            User saved = userRepository.save(user);
            log.info("Created user with id: {}", saved.getId());
            return userMapper.toResponse(saved);
        } catch (DataIntegrityViolationException e) {
            throw new ConflictException("User with email " + request.email() + " already exists");
        }
    }

    @Override
    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return userMapper.toResponse(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userMapper.updateEntity(user, request);
        try {
            User updated = userRepository.save(user);
            return userMapper.toResponse(updated);
        } catch (DataIntegrityViolationException e) {
            throw new ConflictException("User with email " + request.email() + " already exists");
        }
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
        log.info("Deleted user with id: {}", id);
    }
}
