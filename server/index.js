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
const { hash } = require("./utils/bcrypt");
require("./utils/local");

// Use the environment variable PORT or 3000
const port = process.env.PORT || 3000;
// Setup next.js
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
// Setup session stores incase server crashes, the current logins will be saved (default is 1 day)
const sessionStore = new MySQLStore(
  {
    // expiration is 30 mins
    expiration: 1800000,
    // table loginCookie contains the login tokens
    schema: {
      tableName: "loginCookie",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  pool
);

/**
 * Checks to see if there are active admin accounts and creates
 * a default account if no admins are present.
 */
async function checkForAdmin() {
  await pool
    .query("SELECT * FROM user WHERE type=? AND status<=?", ["admin", 2])
    .then((table) => {
      // Successful query
      // If table is empty, add new account
      if (table[0].length === 0) {
        console.log("No Admins Present, attempting to create...");
        createAdmin();
      } else {
        // Otherwise, no action necessary
        console.log("Admins present, use existing accounts to login.");
      }
    }).catch(err => {
      // Failed query
      console.log(err);
    });
}

/**
 * Creates a default admin account based on the .env file
 */
async function createAdmin() {
  // check that .env has appropriate variables
  if (!(process.env.DEFAULT_ADMIN && process.env.DEFAULT_PASSWORD)) {
    console.log(
      "No values present in .env file for DEFAULT_ADMIN and DEFAULT_PASSWORD."
    );
    return;
  }

  // create values for default user account
  const body = {
    email: process.env.DEFAULT_ADMIN,
    first_name: "Admin",
    last_name: "Admin",
    password_hash: hash(process.env.DEFAULT_PASSWORD),
    created_at: new Date().toLocaleDateString("en-CA"),
    pronouns: 3,
    type: "admin",
  };

  // Insert values into database
  await pool
    .execute(
      "INSERT INTO user (first_name, last_name, email, pronouns, created_at, type, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [
        body.first_name,
        body.last_name,
        body.email,
        body.pronouns,
        body.created_at,
        body.type,
        body.password_hash,
      ]
    )
    .then((response) => {
      // Success
      console.log("Admin Created!");
      console.log(
        `Username: ${process.env.DEFAULT_ADMIN}\nPassword: ${process.env.DEFAULT_PASSWORD}`
      );
    })
    .catch((err) => {
      // Failure
      console.log(err);
    });
}

app
  // Prepare to go into next.js
  .prepare()
  // Launch Express server
  .then(() => {
    // Create express server
    const server = express();
    checkForAdmin();

    // Cross-origin resource sharing, in order for your server to be accessible by other origins (domains)
    // Enables the express server to respond to preflight requests
    // Axios will need this to run correctly in the frontend
    server.use(cors());
    // BodyParser is deprecated and express is a built-in parser
    // Tells the the system that JSON is to be used
    server.use(express.json());
    // True for deep parsing (can do nested objects) and false for shallow parsing
    server.use(express.urlencoded({ extended: true }));

    // Recommended express-session cookies, maxAge default is till end of session
    server.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        // sameSite default is lax, required to be explictly set
        cookie: { sameSite: "lax" },
        // Requires a HTTPS website to work, rethink sameSite also
        // cookie: { secure: true },
      })
    );

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
