
DROP TABLE IF EXISTS nodes;

CREATE TABLE nodes (
    id SERIAL PRIMARY KEY,
    parentId INTEGER,
    name TEXT NOT NULL,
    wrapper BOOLEAN,
    color TEXT
);

-- Dummy Node Data For Testing
INSERT INTO nodes (parentId, name, color, wrapper)
VALUES
    (NULL, 'Programming Tree', 'orange', 'true'),
    (1, 'Web Development', 'blue', 'false'),
    (1, 'Console Applications', 'blue', 'true'),
    (1, 'Data Science', 'blue', 'false'),
    (3, 'Datatypes', 'green', 'false'),
    (3, 'Variables', 'green', 'false');
