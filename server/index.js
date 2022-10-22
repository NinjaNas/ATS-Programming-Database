// Dependencies
require("dotenv").config();
const express = require("express");
const next = require("next");
const cors = require("cors");
const routes = require("./routes");

// Use the environment variable PORT or 3000
const port = process.env.PORT || 3000;
// Setup next.js
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

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
    process.exit(1);
  });
