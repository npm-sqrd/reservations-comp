/* drop tables */
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS restaurants;


/* create tables */
CREATE TABLE restaurants (
  id         integer PRIMARY KEY,
  name       VARCHAR(140),
  seats      smallint
);

CREATE TABLE reservations (
  id              SERIAL PRIMARY KEY,
  restaurantId    integer NOT NULL,
  date            Date,
  time            smallint,
  name            varchar(140),
  party           smallint,
  timestamp       Date DEFAULT NOW(),
  FOREIGN KEY (restaurantId) 
    REFERENCES restaurants(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);


-- /* insert some sample data */
-- INSERT INTO restaurants (id, name, seats)
--   VALUES (1, 'Krusty Burger', 10);

-- INSERT INTO reservations (restaurantId, date, time, name, party)
--   VALUES (1, NOW(), 17, 'Homer Simpson', 5);
