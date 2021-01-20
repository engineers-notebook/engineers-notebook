-- users and groups
SELECT 
  g.name
FROM user_groups ug
  LEFT JOIN users u ON u.user_id = ug.user_id
  LEFT JOIN groups g ON g.group_id = ug.group_id;

SELECT n.name as notebook,
  c.*
FROM cards c
  LEFT JOIN notebooks n ON c.notebook_id = n.notebook_id
  LEFT JOIN groups g ON g.group_id = n.group_id
WHERE n.group_id = 2;