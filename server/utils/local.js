// Implement passport-local strategy
const passport = require("passport");
const { Strategy } = require("passport-local");
const { getConnection } = require("../utils/pool");
const { compareHash } = require("../utils/bcrypt");

passport.use(
  new Strategy(
    {
      // Sets json header 'email' as the user, else 'user' by default
      usernameField: "email",
    },

    async (email, password, done) => {
      try {
        // Await connection
        let connection = await getConnection();
        console.log(email);
        console.log(password);
        if (!email || !password) throw new Error("Bad Request");

        let [rows, fields] = await connection
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
          done(null, rows[0]);
        } else {
          console.log("Failed to Authenticate!");
          done(null, null);
        }
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    }
  )
);
