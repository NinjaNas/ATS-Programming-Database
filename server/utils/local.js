// Implement passport-local strategy
const passport = require("passport");
const { Strategy } = require("passport-local");
const pool = require("../utils/pool");
const { compareHash } = require("../utils/bcrypt");

// user is the user object sent from passport.use() below
passport.serializeUser((user, done) => {
  console.log("Serializing User...");
  console.log(user);
  // Sends the id from the user's object
  done(null, user.id);
});

// Uses the id from passport.serializeUser() to deserialize
passport.deserializeUser(async (id, done) => {
  console.log("Deserializing User...");
  console.log(id);

  // Using the id, find the user object in the database
  await pool
    .query("SELECT id FROM users WHERE id=?;", [id])
    // user contains rows and fields
    .then((user) => {
      if (!user) throw new Error("User not found");
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

passport.use(
  new Strategy(
    {
      // Sets json header 'email' as the user, else 'user' by default
      usernameField: "email",
    },

    async (email, password, done) => {
      try {
        console.log(email);
        console.log(password);

        // If missing either email or password
        if (!email || !password) throw new Error("Bad Request");

        // Grab user object
        let [rows, fields] = await pool
          .query("SELECT * FROM users WHERE email=?;", [email])
          .catch((err) => {
            // Do not throw error inside of promise
            console.log(err);
          });

        // If no email matches, auth fails
        if (!rows.length) throw new Error("User not found");

        // Grab the account and compare the login password to the hash password in the table
        const isValid = compareHash(password, rows[0].password_hash);

        if (isValid) {
          console.log("Authenticated Successfully!");
          // (Sends err, Sends the user object to be serialized)
          done(null, rows[0]);
        } else {
          console.log("Failed to Authenticate!");
          done(null, null);
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);
