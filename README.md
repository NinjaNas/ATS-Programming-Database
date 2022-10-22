# ATS-Programming-Database

Run using `yarn run dev`
Starts a nodemon server and a hot refresh for next.js.

__The .env file should be in the root.__

Endpoints:

Get database records:
`localhost:3000/api/users`

Create Users:
`localhost:3000/api/users/create`
Page should redirect back to `/api/users`

Folders:

* components - Contains React components

* pages - Contains the client pages, does the routing on its own

    * _app.js - Renders all the pages, uses globals.css

    * _document.js - Allows injection of scripts into the head

* server - Express backend

* styles - CSS stylesheets (Only one global.css, use {name}.module.css for certain modules)

Pages:

* `/`

* `/admin`

* `/student`

* `/sign-in`

* `/sign-up`
