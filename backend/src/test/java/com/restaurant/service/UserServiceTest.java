package com.restaurant.service;

import com.restaurant.model.User;
import com.restaurant.repository.UserRepository;
import com.restaurant.exception.UserAlreadyExistsException;
import com.restaurant.exception.UserNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createUser_Success() {
        // Arrange
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("password123");

        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        // Act
        User result = userService.createUser(user);

        // Assert
        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
        assertEquals("encodedPassword", result.getPassword());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void createUser_UsernameExists_ThrowsException() {
        // Arrange
        User user = new User();
        user.setUsername("existinguser");
        user.setPassword("password123");

        when(userRepository.existsByUsername(anyString())).thenReturn(true);

        // Act & Assert
        assertThrows(UserAlreadyExistsException.class, () -> userService.createUser(user));
    }

    @Test
    void findByUsername_Success() {
        // Arrange
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("password123");

        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));

        // Act
        User result = userService.findByUsername("testuser");

        // Assert
        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
        assertEquals("password123", result.getPassword());
    }

    @Test
    void findByUsername_NotFound_ThrowsException() {
        // Arrange
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> userService.findByUsername("nonexistent"));
    }

    @Test
    void validatePassword_Success() {
        // Arrange
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("encodedPassword");

        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);

        // Act
        boolean result = userService.validatePassword("testuser", "password123");

        // Assert
        assertTrue(result);
    }

    @Test
    void validatePassword_InvalidPassword_ReturnsFalse() {
        // Arrange
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("encodedPassword");

        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);

        // Act
        boolean result = userService.validatePassword("testuser", "wrongpassword");

        // Assert
        assertFalse(result);
    }
} 