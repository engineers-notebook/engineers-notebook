# Planda

## General Database

Tables appconfig, frontend, backend and webpack hold default cards

on Signup, a new table is created with username and thats where all custom cards are stored.

## API endpoints

Api endpoints to retrieve card information are all the same right now (appconfig has less columns).

Possible notebooks are webpack, frontend, backend or appconfig

_appconfig only has id, title and description fields_

### `GET /api/<notebook>/:username`:

get cards from default tables and user table and returns both

Response:

```typescript
// [defaultCards[], customCards[]]
[
  {id:number, title: string, description: string, resources: string, iscompleted: boolean}[],
  {id: number, name: string, password: string, type: 'Webpack', title: string, description: string, resources: string, iscompleted: boolean}
  ]
```

### `POST /api/<notebook>`:

create custom card in user table

Request: json

```typescript
{
  title,  // Card title
  description, // card description
  resources, // link
  iscompleted: boolean, // checkmark status
  type, // Webpack, frontend, backend or appconfig
  name // username
}
```

Response: 200 if succesful

### `GET /api/getCookie`

reads request cookies and returns in response

Response: json

```typescript
{
 name: // user name
 username: // user name
}
```

### `POST /api/signup`

Receives user info, creates new table with user name and returns 200

Side Effects: Sets cookie `name` to user name

Request: `{name: strin, password: string}

### `POST /api/login`

Side Effects: Sets cookie `username` to user name

Request: `{name: strin, password: string}

Response: json: `username: string`
