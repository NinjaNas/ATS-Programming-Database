// Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./routes");

// Create instance of express
const app = express();
// Use the environment variable PORT or 3000
const port = process.env.PORT || 3000;

// Cross-origin resource sharing, in order for your server to be accessible by other origins (domains)
// Enables the express server to respond to preflight requests
// Axios will need this to run correctly in the frontend
app.use(cors());
// BodyParser is deprecated and express is a built-in parser
// Tells the the system that JSON is to be used
app.use(express.json());
// True for deep parsing (can do nested objects) and false for shallow parsing
app.use(express.urlencoded({ extended: true }));
// Routing
app.use("/", router);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "/build")));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

/**
 * Event listener
 *
 *  Binds and listens to the connections on the specified host and port
 */
app.listen(port, () => {
  // Listens and prints out if port is running
  console.log(`Example app listening at http://localhost:${port}`);
});
