### Highlights -- a twitter clone 


### Project Description:
A twitter clone built with Next.js, Node.js, Express, and PostgreSQL.

### Features:
    - users may post "highlights" (tweets)
    - users may follow other users
    - users may like other users' highlights
    - users may comment on other users' highlights
    - users may message or DM other users (via websockets)


### Front End: 
    - built with create next.js app

### Back End:
    - Node.js and Express with PostgreSQL database


### Installation and Set up Instructions:
1. clone repo
2. install dependencies
in the root of the project run `npm install`
cd into client and run `npm install`

3. create a database in postgres with the sql scipt in /db

4. create an .env file with the following variables

| Variable Name | Value |
| :---:   | :---: | 
| NODE_ENV | dev  |
| PORT | 3000 |
| DATABASE_URL | your-database-conneciton string |


### Deployment Instructions:
- next js client and node app deployed on heroku
- postgres database deployed on supabase

### Web Socket Instructions:
https://devcenter.heroku.com/articles/node-websockets
this app uses web sockets to send messages between users, and trigger database updates.

