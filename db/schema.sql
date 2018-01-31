
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
	id SERIAL PRIMARY KEY,
	res_id INTEGER UNIQUE,
	name VARCHAR (255),
	city VARCHAR (255)

);

DROP TABLE IF EXISTS likes;

CREATE TABLE likes (
	id SERIAL PRIMARY KEY,
  res_id INTEGER REFERENCES restaurants(res_id),
	likes INTEGER
    -- FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)


);
-- create table reviews 
-- references res_id