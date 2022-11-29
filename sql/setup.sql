-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS bikes;

CREATE TABLE dogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    age  INT,
    breed VARCHAR
);

INSERT INTO dogs (
    name, age, breed
)
VALUES
('Marvin', 4, 'Mutt'),
('Max', 14, 'Lab'),
('Ruby', 16, 'Schnauzer'),
('Bently', 7, 'Kelpie');

CREATE TABLE games (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    console VARCHAR,
    genre VARCHAR
);

INSERT INTO games (
    name, console, genre
)
VALUES
('Ocarina of Time', 'Nintendo 64', 'RPG'),
('Breath of the Wild', 'Switch', 'Open-World'),
('God of War 4', 'PS4', 'Action'),
('God of War: Ragnarok', 'PS5', 'Action');

CREATE TABLE bikes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand VARCHAR,
    model VARCHAR,
    style VARCHAR
);

INSERT INTO bikes (
    brand, model, style
)
VALUES
('Giant', 'Revolt', 'gravel'),
('All City', 'Space Horse', 'touring'),
('Cannondale', 'Super Six Evo', 'racing'),
('Salsa', 'Beargrease', 'fat');