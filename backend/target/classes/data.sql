-- Insert users with username and password only
INSERT INTO users (username, password) VALUES ('admin', 'admin');
INSERT INTO users (username, password) VALUES ('user', 'user');

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category, available, created_at, updated_at) 
VALUES 
-- Starters/Appetizers
('Paneer Tikka', 'Grilled cottage cheese marinated in Indian spices', 299, 'APPETIZER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Samosa', 'Crispy pastry filled with spiced potatoes and peas', 89, 'APPETIZER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Onion Bhaji', 'Crispy onion fritters with Indian spices', 149, 'APPETIZER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Chicken 65', 'Spicy deep-fried chicken with curry leaves', 349, 'APPETIZER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Main Course
('Butter Chicken', 'Creamy tomato-based curry with tender chicken', 449, 'MAIN_COURSE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Paneer Butter Masala', 'Rich and creamy curry with cottage cheese', 399, 'MAIN_COURSE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Dal Makhani', 'Creamy black lentils cooked overnight', 299, 'MAIN_COURSE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Biryani', 'Fragrant rice dish with aromatic spices and vegetables', 399, 'MAIN_COURSE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Palak Paneer', 'Cottage cheese in creamy spinach gravy', 349, 'MAIN_COURSE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Breads
('Butter Naan', 'Soft bread from tandoor with butter', 69, 'SIDE_DISH', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Garlic Naan', 'Naan bread with garlic and herbs', 79, 'SIDE_DISH', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Roti', 'Whole wheat bread from tandoor', 45, 'SIDE_DISH', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Laccha Paratha', 'Layered whole wheat bread', 89, 'SIDE_DISH', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Rice and Accompaniments
('Jeera Rice', 'Basmati rice with cumin', 199, 'SIDE_DISH', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Raita', 'Yogurt with mild spices and vegetables', 99, 'SIDE_DISH', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Desserts
('Gulab Jamun', 'Sweet milk dumplings in sugar syrup', 149, 'DESSERT', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Rasmalai', 'Soft cottage cheese dumplings in sweet milk', 179, 'DESSERT', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Kheer', 'Traditional rice pudding with nuts', 159, 'DESSERT', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Beverages
('Masala Chai', 'Indian spiced tea with milk', 79, 'BEVERAGE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Lassi', 'Sweet yogurt-based drink', 129, 'BEVERAGE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mango Lassi', 'Yogurt-based drink with mango pulp', 149, 'BEVERAGE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Fresh Lime Soda', 'Refreshing lime-based drink', 99, 'BEVERAGE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 