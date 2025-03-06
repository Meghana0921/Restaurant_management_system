package com.restaurant.service;

import com.restaurant.model.User;
import com.restaurant.repository.UserRepository;
import com.restaurant.exception.UserAlreadyExistsException;
import com.restaurant.exception.UserNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        // Check if username already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public User findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }
        
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found");
        }
        userRepository.deleteById(id);
    }

    public boolean validatePassword(String username, String password) {
        User user = findByUsername(username);
        return passwordEncoder.matches(password, user.getPassword());
    }
} 