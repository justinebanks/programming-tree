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
    (NULL, 'Dev Tree', 'true', 'false', 'false'),
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

UPDATE nodes
SET segments = '%5B%22OnRleHQ6VmFyaWFibGVzIGFyZSB0aGUgbW9zdCBiYXNpYyBmdW5kYW1lbnRhbCBjb25jZXB0IGluIHByb2dyYW1taW5nLiBUaGUgYWJpbGl0eSB0byBzdG9yZSB2YWx1ZXMgaW4gbWVtb3J5IGlzIGV4dHJlbWVseSBpbXBvcnRhbnQgaW4gcHJvZ3JhbW1pbmcgYW5kIGlzIHRoZSBiYXNpcyBtYW55IG90aGVyIG1vcmUgY29tcGxleCB0b3BpY3Mu%22,%22OmhlYWQ6RXhhbXBsZQ==%22,%22OnRleHQ6QXMgYW4gZXhhbXBsZSwgSSdsbCBzaG93IHdoYXQgdGhlIGRlY2xhcmF0aW9uIG9mIGEgdmFyaWFibGUgbG9va3MgbGlrZSBpbiBKYXZhc2NyaXB0LCBvbmUgb2YgdGhlIG1vc3QgcG9wdWxhciBtb2Rlcm4gcHJvZ3JhbW1pbmcgbGFuZ3VhZ2VzOg==%22,%22OmNvZGU6bGV0IHggPSAwOyAvLyBEZWNsYXJlcyBhIHZhcmlhYmxlIHggYW5kIHNldHMgaXQgdG8gdGhlIG51bWJlciAwCmxldCBuYW1lID0gJ2p1c3Rpbic7IC8vIFNldHMgYSB2YXJpYWJsZSBuYW1lZCBuYW1lIHRvIHRoZSB0ZXh0ICdqdXN0aW4nCgpsZXQgeTsgLy8gRGVjbGFyZXMgYSB2YXJpYWJsZSB5LCBidXQgZG9lcyBub3QgZ2l2ZSBpdCBhIHZhbHVl%22,%22OnRleHQ6VGhlcmUgYXJlIG1hbnkgZGlmZmVyZW50IHR5cGVzIG9mIHZhcmlhYmxlcy4gU29tZSBzdG9yZSB0ZXh0LCBzb21lIHN0b3JlIG51bWJlcnMsIGFuZCBvdGhlcnMgc3RvcmUgdHJ1ZS9mYWxzZSB2YWx1ZXMuIEhlcmUgYXJlIHNvbWUgZXhhbXBsZXM6%22,%22OmNvZGU6bGV0IGEgPSAxMDsgLy8gVGhpcyB2YXJpYWJsZSBzdG9yZXMgYW4gaW50ZWdlciwgYSBudW1iZXIgd2l0aG91dCBhbnkgZGVjaW1hbCBwbGFjZXMKbGV0IHBpID0gMy4xNDE1OTI7IC8vIHRoaXMgdmFyaWFibGUgc3RvcmVzIHdoYXQncyBjYWxsZWQgYSBmbG9hdGluZy1wb2ludCBudW1iZXIgYWthIGEgZmxvYXQuIEl0IHJlZmVycyB0byBhbnkgZGVjaW1hbCBudW1iZXIKbGV0IGlzQ29ycmVjdCA9IGZhbHNlOyAvLyBUaGlzIGlzIGNhbGxlZCBhIGJvb2xlYW4uIFRoZSBvbmx5IDIgYm9vbGVhbiB2YWx1ZXMgYXJlIHRydWUgYW5kIGZhbHNlCmxldCB0ZXh0ID0gJ2hlbGxvIHdvcmxkISc7IC8vIFRoaXMgaXMgY2FsbGVkIGEgc3RyaW5nLiBJdCBzdG9yZXMgdGV4dCBkYXRh%22,%22OnRleHQ6U3BlY2lmaWNhbGx5IGluIEphdmFzY3JpcHQsIHRoZXJlIGFyZSBtdWx0aXBsZSBrZXl3b3JkcyB0aGF0IGNhbiBiZSB1c2VkIHRvIGRlZmluZSBhIHZhcmlhYmxlIHRoZXNlIGFyZSB2YXIsIGxldCwgYW5kIGNvbnN0LiB2YXIgYW5kIGxldCBlc3NlbnRpYWxseSBkbyB0aGUgc2FtZSB0aGluZywgYnV0IGNvbnN0IGRlZmluZXMgYSBjb25zdGFudCB2YXJpYWJsZSB0aGF0IGNhbid0IGJlIGNoYW5nZWQ=%22,%22OmNvZGU6bGV0IG15VmFyaWFibGUgPSAnSSBhbSBhIHZhcmlhYmxlJzsKIHZhciB2YXJpYWJsZTIgPSAnSSBhbSBhbHNvIGEgdmFyaWFibGUnOwpjb25zdCBteUNvbnN0YW50ID0gJ0kgYW0gY29uc3RhbnQnOw==%22,%22OnRleHQ6SGVyZSBpcyBhIHVzZWZ1bCB2aWRlbyBpbnRyb2R1Y3Rpb24gdG8gdmFyaWFibGVz%22,%22Onl2aWQ6Z2hDYlVSTVdCRDg=%22,%22OnRleHQ6V2UgYXJlIG5vdCBhZmZpbGlhdGVkIHdpdGggYW55IHZpZGVvcyBvciBvdXRzaWRlIGxpbmtzIHByb3ZpZGVk%22%5D'
WHERE id = 9;

UPDATE nodes
SET segments = '%5B%22OnRleHQ6Q29uZGl0aW9uYWxzIGNvbnRyb2wgdGhlIGZsb3cgb2YgdGhlIHByb2dyYW0gYXMgaXQgcnVucy4gV2hlbiB3ZSBzYXkgY29uZGl0aW9uYWxzLCB3ZSByZWZlciB0byBpZiBzdGF0ZW1lbnRzLCBlbHNlIGlmIHN0YXRlbWVudHMsIGFuZCBlbHNlIHN0YXRlbWVudHMu%22,%22OnRleHQ6SWYgc3RhdGVtZW50cyB0YWtlIGluIGEgYm9vbGVhbiB2YWx1ZSAoc2VlIFZhcmlhYmxlcyBzZWN0aW9uKSwgd2hpY2ggYXJlIHRydWUgb3IgZmFsc2UgdmFsdWVzIHRvIGRldGVybWluZSBpZiBhIGNlcnRhaW4gcGllY2Ugb2YgY29kZSBydW5z%22,%22OmNvZGU6bGV0IGlzQ29vbCA9IHRydWU7CgppZiAoaXNDb29sKSB7Cgljb25zb2xlLmxvZygnSSBhbSBjb29sJyk7Cn0KY29uc29sZS5sb2coJ05vdyB5b3Uga25vdycpOw==%22,%22OnRleHQ6VGhlICdub3cgeW91IGtub3cnIHBhcnQgd2lsbCBhbHdheXMgcnVuLCBidXQgdGhlIHByaW50aW5nIG9mICdJIGFtIGNvb2wnIHdpbGwgb25seSBydW4gaWYgdGhlIGlzQ29vbCB2YXJpYWJsZSBpcyBlcXVhbCB0byB0cnVlLg==%22,%22OnRleHQ6RWxzZSBzdGF0ZW1lbnRzIGFyZSB1c2VkIGluIGNvbWJpbmF0aW9uIHdpdGggaWYgc3RhdGVtZW50cyBpbiBvcmRlciB0byBkZWZpbmUgd2hhdCBoYXBwZW5zIHdoZW4gdGhlIGJvb2xlYW4gc3RhdGVtZW50IGlzIG5vdCB0cnVl%22,%22OmNvZGU6bGV0IGlzQ29vbCA9IHRydWU7CgppZiAoaXNDb29sKSB7Cgljb25zb2xlLmxvZygnSSBhbSBjb29sJyk7Cn0KZWxzZSB7Cgljb25zb2xlLmxvZygnSSBhbSBub3QgY29vbCcpOwp9CmNvbnNvbGUubG9nKCdOb3cgeW91IGtub3cnKTs=%22,%22OnRleHQ6U28gbm93LCBpZiBpc0Nvb2wgaXMgdHJ1ZSwgJ0kgYW0gY29vbCcgd2lsbCBiZSBwcmludGVkLCBidXQgaWYgaXQncyBmYWxzZSAnSSBhbSBub3QgY29vbCcgd2lsbCBiZSBwcmludGVkLiAnTm93IHlvdSBrbm93JyB3aWxsIGJlIHByaW50ZWQgbm8gbWF0dGVyIHdoYXQgc2luY2UgaXRzIG5vdCB3cmFwcGVkIGluIGFueSBraW5kIG9mIHN0YXRlbWVudA==%22,%22OnRleHQ6RmluYWxseSwgZWxzZSBpZiBzdGF0ZW1lbnRzIGFyZSB1c2VkIGZvciBzdGF0ZW1lbnRzIHRoYXQgc2hvdWxkIGhhbmRsZSBtYW55IGRpZmZlcmVudCBjYXNlcy4gRm9yIGV4YW1wbGUsIGlmIHlvdSB3YW50IG9uZSB0byBoYXBwZW4gaWYgaXQncyBUdWVzZGF5LCBhbm90aGVyIHRoaW5nIHRvIGhhcHBlbiBpZiBpdCdzIEZyaWRheSwgYW5kIHNvbWV0aGluZyBlbHNlIHRvIGhhcHBlbiBpZiB0aGUgZGF5IGlzIGFueXRoaW5nIGVsc2U=%22,%22OmNvZGU6bGV0IGRheSA9ICd3ZWRuZXNkYXknOwoKaWYgKGRheSA9PSAndHVlc2RheScpIHsKCWNvbnNvbGUubG9nKCdUb2RheSB5b3UgaGF2ZSB3b3JrJyk7Cn0KZWxzZSBpZiAoZGF5ID09ICdmcmlkYXknKSB7Cgljb25zb2xlLmxvZygnVG9kYXkgeW91IGhhdmUgc2Nob29sJyk7Cn0KZWxzZSB7Cgljb25zb2xlLmxvZygnVG9kYXkgeW91IGFyZSBmcmVlJyk7Cn0=%22,%22OnRleHQ6VGhpcyBjb2RlIHRlbGxzIHlvdSB5b3UgaGF2ZSB3b3JrIGlmIGl0J3MgdHVlc2RheSwgc2Nob29sIGlmIGl0J3MgZnJpZGF5LCBhbmQgdGVsbHMgeW91IHlvdSdyZSBmcmVlIGlmIGRheSBpcyBlcXVhbCB0byBhbnl0aGluZyBlbHNl%22%5D'
WHERE id = 10;



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

