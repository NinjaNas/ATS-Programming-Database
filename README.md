# ATS-Programming-Database

Run using `yarn run dev`
Starts a nodemon server and a hot refresh for next.js.

**The .env file should be in the root.**

Endpoints:

Get database records:
`localhost:3000/api/users`

Create Users:
`localhost:3000/api/users/create`
Page should redirect back to `/api/users`

Authorize user:
`localhost:3000/api/auth`
Send json with email: and password: for verification to this endpoint

Client Folders:

- components - Contains React components

- pages - Contains the client pages, does the routing on its own

  - \_app.js - Renders all the pages, uses globals.css

  - \_document.js - Allows injection of scripts into the head

- server - Express backend

- styles - CSS stylesheets (Only one global.css, use {name}.module.css for certain modules)

Server Folders:

- routes - Contains the routing for the api

- utils - Contains auth strategies, helper functions, and code that is reused

  - \bcrypt - Hash library, helper functions

  - \local - passport-local auth strategy

  - \pool - Create pool connections to the database

  - \authorize - Middleware to create authorization for certain files or use it as middleware for certain HTTPS requests

    Pages:

- `/`

- `/admin`

- `/student`

- `/sign-in`

- `/sign-up`

- `/users/test`

Testing Auth:

- Install dependencies `yarn install`
- Start server `yarn run dev`
- Go to `/api/users`, see that you are unauthorized
- Use navbar to go to `/sign-up`
- Create a random account, knowing the email and password, see that the values are inserted
- Use navbar to go to `/login`
- Login with no email or no password, see that it does not work
- Login with invalid email or password, see that it does not work
- Login with the correct email and password
- Go to `/api/users`, see that you are authorized
- Restart the server
- Go back to `/api/users`, see that you are still authorized, even if the server closes down (cookie with expiration in database managed by session stores)
