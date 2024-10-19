
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
    (1, 'Console Applications', 'true', 'true', 'true'),
	(2, 'Web Development', 'false', 'false', 'false'),
    (2, 'Data Science', 'false', 'false', 'false'),
    (2, 'Datatypes', 'false', 'true', 'true'),
    (2, 'Variables', 'false', 'true', 'true');
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

