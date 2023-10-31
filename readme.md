### Highlights -- a twitter clone

A twitter clone built with Next.js, Node.js, Express, and PostgreSQL.

### Features:

    - users may post "highlights" (tweets)
    - users may follow other users
    - users may like other users' highlights
    - users may comment on other users' highlights
    - users may message or DM other users (via websockets)

### Front End:

    - built with create next.js app.

### Back End:

    - Node.js and Express with PostgreSQL database.
    - caching with Redis.
    - websockets for messaging.
    - AWS S3 for storing user profile images.

## Installation and Set up Instructions:

1. clone repo
2. install dependencies
   in the root of the project run `npm install`
   cd into client and run `npm install`

3. create a database in postgres with the sql scipt in /db

4. create an .env file with the following variables

| Variable Name |              Value              |
| :-----------: | :-----------------------------: |
|   NODE_ENV    |               dev               |
|     PORT      |              3000               |
| DATABASE_URL  | your-database-conneciton string |

5. create a db.js file in the /server directory with a connection to your database

```javascript
const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || "your-database-conneciton string",
});

module.exports = pool;
```

6. redis server setup:
   [redis and nodejs docs](https://redis.io/docs/connect/clients/nodejs/)

```bash
## local redis server setup
# for mac os users, install redis with homebrew
brew install redis

redis-server # to start the server

redis-cli # to start the redis cli
```

8. AWS S3 setup:
   [aws s3 docs](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html)

   - used for storing user profile images and other media

9. start-up
   run the app in the root of the project run `node server.js`and in the client directory run `npm run dev`

- the app will be running on localhost:3000, and server on localhost:3001

### Testing:

WIP

### Deployment Instructions:

- next js client and node app deployed on heroku
- postgres database deployed on supabase

### Supabase Instructions:

- create a supabase account
- create a new project

### Heroku Instructions:

- create a heroku account
- create a new app

### Web Socket Instructions:

https://devcenter.heroku.com/articles/node-websockets
this app uses web sockets to send messages between users, and trigger database updates.
https://socket.io/get-started/chat

### Redis Cloud Instructions:

WIP

### Icons Setup:

https://mui.com/material-ui/getting-started/installation/
