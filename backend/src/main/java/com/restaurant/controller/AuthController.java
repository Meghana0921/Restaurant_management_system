package com.restaurant.controller;

import com.restaurant.model.User;
import com.restaurant.service.UserService;
import com.restaurant.exception.UserNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String username = credentials.get("username");
            String password = credentials.get("password");

            if (username == null || password == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Username and password are required"));
            }

            if (!userService.validatePassword(username, password)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid credentials"));
            }

            User user = userService.findByUsername(username);
            return ResponseEntity.ok(Map.of(
                "user", Map.of(
                    "username", user.getUsername()
                )
            ));
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid credentials"));
        }
    }
} 