package com.restaurant.model;

import javax.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "table_number")
    private String tableNumber;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(name = "total_amount", nullable = false)
    private double totalAmount;

    @Column(name = "waiter_name")
    private String waiterName;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "special_instructions")
    private String specialInstructions;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum OrderStatus {
        NEW,
        PREPARING,
        READY,
        SERVED,
        CANCELLED
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Entity
    @Table(name = "order_items")
    @Data
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItem {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "menu_item_id")
        private Long menuItemId;

        @Column(nullable = false)
        private String name;

        @Column(nullable = false)
        private int quantity;

        @Column(nullable = false)
        private double price;

        @Column(name = "special_instructions")
        private String specialInstructions;
    }
} 