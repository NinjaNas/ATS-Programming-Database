// Dependencies
require("dotenv").config();
const express = require("express");
const next = require("next");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const pool = require("./utils/pool");
const routes = require("./routes");
require("./utils/local");

// Use the environment variable PORT or 3000
const port = process.env.PORT || 3000;
// Setup next.js
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
// Setup session stores incase server crashes, the current logins will be saved (30 min)
const sessionStore = new MySQLStore({ expiration: 1800000 }, pool);

app
  // Prepare to go into next.js
  .prepare()
  // Launch Express server
  .then(() => {
    // Create express server
    const server = express();

    // Cross-origin resource sharing, in order for your server to be accessible by other origins (domains)
    // Enables the express server to respond to preflight requests
    // Axios will need this to run correctly in the frontend
    server.use(cors());
    // BodyParser is deprecated and express is a built-in parser
    // Tells the the system that JSON is to be used
    server.use(express.json());
    // True for deep parsing (can do nested objects) and false for shallow parsing
    server.use(express.urlencoded({ extended: true }));

    // Recommended express-session cookies
    server.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: { maxAge: 1800000 },
        // Requires a HTTPS website to work
        // cookie: { secure: true },
      })
    );

    // Print out sessionStore
    // server.use((req, res, next) => {
    //   console.log(sessionStore);
    //   next();
    // });

    // Start Passport
    server.use(passport.initialize());
    server.use(passport.session());

    // Routing
    server.use("/api", routes);

    // Serve files to server
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    /**
     * Event listener
     *
     *  Binds and listens to the connections on the specified host and port
     */
    server.listen(port, (err) => {
      if (err) throw err;
      // Listens and prints out if port is running
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err.stack);
    // End pool connection before exit
    pool.end();
    process.exit(1);
  });
