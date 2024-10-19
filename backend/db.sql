
DROP TABLE IF EXISTS nodes;

CREATE TABLE nodes (
    id SERIAL PRIMARY KEY,
    parentId INTEGER,
    name TEXT NOT NULL,
    wrapper BOOLEAN NOT NULL,
	button BOOLEAN NOT NULL,
	within BOOLEAN NOT NULL,
    segments TEXT DEFAULT ''
);

-- Dummy Node Data For Testing
INSERT INTO nodes (parentId, name, wrapper, button, within)
VALUES
    (NULL, 'Programming Tree', 'true', 'false', 'false'),
    (1, 'Fundamentals', 'true', 'true', 'true'),
	(2, 'Python', 'false', 'false', 'false'),
    (3, 'Object Oriented Programming', 'false', 'false', 'false'),
    (3, 'Data Science', 'false', 'false', 'false'),
    (3, 'Basic Algorithms', 'true', 'false', 'false'),
    (3, 'Low Level Languages', 'false', 'false', 'false'),
    (2, 'Datatypes', 'false', 'true', 'true'),
    (2, 'Variables', 'false', 'true', 'true'),
    (2, 'Conditionals', 'false', 'true', 'true'),
	(2, 'Functions', 'false', 'true', 'true'),
	(8, 'Comparing Between Types', 'false', 'true', 'false'),
	(6, 'Design', 'false', 'true', 'true'),
    (13, 'Game of Life', 'false', 'true', 'false'),
	(13, 'Binary Search', 'false', 'true', 'false'),
	(13, 'Sqare Root', 'false', 'true', 'false'),
	(4, 'GUIs', 'false', 'false', 'false'),
    (4, 'Projects', 'false', 'false', 'false'),
    (4, 'Web Sites', 'false', 'false', 'false');
-- Default Value for 'segment' Column
UPDATE nodes
SET segments = '%5B%22OnRleHQ6VGVzdCBVUkwgRW5jb2RlZCBKU09OIEVsZW1lbnQgTnVtYmVyIE9uZQ==%22,%22OmNvZGU6ZGVmIHRleHRfZnVuYygpOgoJcHJpbnQoNjApCg==%22%5D';



DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
	username TEXT NOT NULL,
	email TEXT NOT NULL,
	password TEXT NOT NULL
	
);

