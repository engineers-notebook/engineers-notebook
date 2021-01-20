DROP TABLE IF EXISTS user_groups;
DROP TABLE IF EXISTS user_cards;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS notebooks;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  "user_id" VARCHAR PRIMARY KEY,
  "username" VARCHAR UNIQUE NOT NULL
);

CREATE TABLE groups
(
  "group_id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL
);

CREATE TABLE user_groups
(
  "user_id" VARCHAR NOT NULL,
  "group_id" INTEGER NOT NULL,
  FOREIGN KEY (user_id)
    REFERENCES users (user_id),
  FOREIGN KEY (group_id)
    REFERENCES groups (group_id)
);

CREATE TABLE notebooks
(
  "notebook_id" SERIAL PRIMARY KEY,
  "name" VARCHAR,
  "group_id" INTEGER NOT NULL,
  FOREIGN KEY (group_id) 
    REFERENCES groups (group_id)
);

CREATE TABLE cards
(
  "card_id" SERIAL PRIMARY KEY,
  "title" VARCHAR NOT NULL,
  "description" VARCHAR,
  "resources" VARCHAR,
  -- replaces iscompleted from v1
  "status" INTEGER NOT NULL,
  "comments_json" VARCHAR,
  "notebook_id" INTEGER NOT NULL,
  FOREIGN KEY (notebook_id)
    REFERENCES notebooks (notebook_id)
);

CREATE TABLE user_cards
(
  "user_id" VARCHAR NOT NULL,
  "card_id" INTEGER NOT NULL,
  PRIMARY KEY (user_id, card_id),
  FOREIGN KEY (user_id)
    REFERENCES users (user_id),
  FOREIGN KEY (card_id)
    REFERENCES cards (card_id)
);
