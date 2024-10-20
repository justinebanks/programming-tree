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
    (4, 'Web Sites', 'false', 'false', 'false'),
	(17, 'Game Engines', 'false', 'false', 'false'),
	(17, '3D Rendering', 'false', 'false', 'false'),
	(7, 'Windows API', 'false', 'false', 'false'),
	(19, 'Frame Works', 'false', 'false', 'false'),
	(23, 'APIs', 'false', 'false', 'false'),
	(6, 'Advanced Algorithms', 'false', 'false', 'false'),
	(25, 'AI', 'false', 'false', 'false');

-- Default Value for 'segment' Column
UPDATE nodes
SET segments = '%5B%22OnRleHQ6VGVzdCBVUkwgRW5jb2RlZCBKU09OIEVsZW1lbnQgTnVtYmVyIE9uZQ==%22,%22OmNvZGU6ZGVmIHRleHRfZnVuYygpOgoJcHJpbnQoNjApCg==%22%5D';

UPDATE nodes
SET segments = '%5B%22OnRleHQ6VGVzdCBVUkwgRW5jb2RlZCBKU09OIEVsZW1lbnQgTnVtYmVyIE9uZQ==%22,%22OmNvZGU6ZGVmIHRleHRfZnVuYygpOgoJcHJpbnQoNjApCg==%22,%22OmNvZGU6ZnVuY3Rpb24gdGVzdEZ1bmN0aW9uKCkgewoJY29uc29sZS5sb2coJ3Rlc3RpbmcgMSAyIDMnKTsKfQ==%22,%22OmhlYWQ6VGVzdCBIZWFkZXI=%22,%22OnRleHQ6TG9yZW0gaXBzdW0sIGRvbG9yIHNpdCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIE5paGlsIHNpbnQgbmVzY2l1bnQgdmVsaXQgaWxsdW0gZGlzdGluY3Rpbz8gU2ltaWxpcXVlIG1vbGVzdGlhcyBxdWlkZW0gbm9zdHJ1bSBuYW0gY3VtcXVlIHBvc3NpbXVzIHZlbGl0LCBkZWJpdGlzIGVhIHNlZCByYXRpb25lIGFiIG9mZmljaWlzIGlwc3VtIGl0YXF1ZQ==%22,%22Onl2aWQ6Rld5aVl6Z1BOaTQ=%22%5D'
WHERE id = 15;


DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
	username TEXT NOT NULL,
	email TEXT NOT NULL,
	password TEXT NOT NULL
	
);


DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS threads;

CREATE TABLE threads (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    thread_id INT REFERENCES threads(id) ON DELETE CASCADE,
    author VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample thread
INSERT INTO threads (title, author) 
VALUES ('Vue.js Forum Setup Help', 'Alice');

-- Insert posts for the thread
INSERT INTO posts (thread_id, author, content) 
VALUES 
(1, 'Bob', 'Can someone help me with setting up a forum in Vue?'),
(1, 'Charlie', 'Here’s a helpful guide!');

