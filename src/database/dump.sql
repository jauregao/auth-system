CREATE DATABASE users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(80)  UNIQUE NOT NULL,
  pass VARCHAR(50)  NOT NULL,
  full_name VARCHAR(80) NOT NULL
);