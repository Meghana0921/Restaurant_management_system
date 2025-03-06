package com.restaurant.repository;

import com.restaurant.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<MenuItem, Long> {
} 