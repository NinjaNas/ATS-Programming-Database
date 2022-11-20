/**
 * If query is requested then respond with user data given the user id
 * Else return the user data of the current logged in user
 */
async function userController(req, res) {
  const { query } = req.query;

  if (query) {
    // Only admin and counselors can query
    if (req.user[0][0].type == "admin" || req.user[0][0].type == "counselor") {
      await pool
        .query("SELECT * FROM user WHERE id=?;", [query])
        .then((table) => {
          // Send HTTPS, promises return the table access rows at 0 and fields at 1
          res.send(table[0]);
        })
        .catch((err) => {
          // Do not throw error inside of promise
          console.log(err);
          res.sendStatus(400);
        });
    } else {
      res.sendStatus(401);
    }
  } else {
    res.send(req.user);
  }

  console.log("Sent user");
  res.status(200);
}

module.exports = { userController };
