-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS dogs;

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
