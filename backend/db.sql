
DROP TABLE IF EXISTS nodes;
DROP TABLE IF EXISTS users;

CREATE TABLE nodes (
    id SERIAL PRIMARY KEY,
    parentId INTEGER,
    name TEXT NOT NULL,
    wrapper BOOLEAN,
    color TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Dummy Data For Testing
INSERT INTO nodes (parentId, name, color, wrapper)
VALUES
    (NULL, 'Programming Tree', 'orange', 'true'),
    (1, 'Web Development', 'blue', 'false'),
    (1, 'Console Applications', 'blue', 'true'),
    (3, 'Datatypes', 'green', 'false'),
    (3, 'Variables', 'green', 'false');