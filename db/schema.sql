
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
	id SERIAL PRIMARY KEY,
	res_id INTEGER UNIQUE ,
	name VARCHAR(255),
	city VARCHAR(255)

);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
  res_id INTEGER REFERENCES restaurants(res_id) ON DELETE CASCADE ON UPDATE CASCADE,
	comment VARCHAR(255),
	author VARCHAR(255)

);
-- create table reviews 
-- references res_id