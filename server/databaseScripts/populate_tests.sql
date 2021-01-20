------------------ user -------------------

TRUNCATE users CASCADE;
INSERT INTO users (user_id, username)
VALUES (87, 'Chuck Norris');
INSERT INTO users (user_id, username)
VALUES (234, 'Serena');

------------------ group ---

TRUNCATE groups CASCADE;
INSERT INTO groups (group_id, name)
VALUES (1, 'Killer Whales');
INSERT INTO groups (group_id, name)
VALUES (2, 'Super');

----------------- user_groups --------------

TRUNCATE user_groups CASCADE;
INSERT INTO user_groups (group_id, user_id)
VALUES (1, 87);
INSERT INTO user_groups (group_id, user_id)
VALUES (2, 87);
INSERT INTO user_groups (group_id, user_id)
VALUES (2, 234);

------------------ notebooks ---------------

TRUNCATE notebooks CASCADE;
INSERT INTO notebooks (notebook_id, group_id, name)
VALUES (5, 2, 'man');
INSERT INTO notebooks (notebook_id, group_id, name)
VALUES (6, 1, 'chuck diary');

----------------- cards --------------------

TRUNCATE cards CASCADE;
INSERT INTO cards (
    card_id,
    title,
    description,
    resources,
    status,
    notebook_id
  )
VALUES (
    1,
    'Create your webpack.config.js',
    'Create a file named webpack.config.js at the top most level of your app, but still within the app folder',
    'https://webpack.js.org/configuration/',
    0,
    5
  );

----------------- assignments --------------------  

TRUNCATE user_cards CASCADE;

INSERT INTO user_cards (
  user_id,
  card_id
)
VALUES(
  87,
  1
);










