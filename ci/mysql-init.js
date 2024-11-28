CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    city VARCHAR(50)
);

INSERT INTO users (name, age, city) VALUES
('Alice', 25, 'New York'),
('Bob', 30, 'Chicago');
