DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	url VARCHAR(255),
	cuisines VARCHAR(255)
);