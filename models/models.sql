-- /models/models.sql

-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100)
);

-- Trains Table
CREATE TABLE trains (
  id SERIAL PRIMARY KEY,
  train_number VARCHAR(50),
  source VARCHAR(100),
  destination VARCHAR(100),
  seats INT
);

-- Bookings Table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  train_id INT REFERENCES trains(id)
);
