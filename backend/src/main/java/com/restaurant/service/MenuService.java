package com.restaurant.service;

import com.restaurant.model.MenuItem;
import com.restaurant.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    public List<MenuItem> getAllMenuItems() {
        return menuRepository.findAll();
    }

    public MenuItem createMenuItem(MenuItem menuItem) {
        return menuRepository.save(menuItem);
    }

    public MenuItem updateMenuItem(Long id, MenuItem menuItem) {
        MenuItem existing = menuRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Menu item not found"));
        
        existing.setName(menuItem.getName());
        existing.setDescription(menuItem.getDescription());
        existing.setPrice(menuItem.getPrice());
        existing.setCategory(menuItem.getCategory());
        existing.setImageUrl(menuItem.getImageUrl());
        existing.setAvailable(menuItem.isAvailable());
        
        return menuRepository.save(existing);
    }

    public void deleteMenuItem(Long id) {
        menuRepository.deleteById(id);
    }
} 