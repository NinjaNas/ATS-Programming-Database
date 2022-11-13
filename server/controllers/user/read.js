const pool = require("../../utils/pool");

async function readController(req, res) {
  // Get user ID from req body
  const { key, tag } = req.query;
  
  //0 key reads UUID, 1 key outputs all, 2 key outputs active
  if (key == 0) {
      await pool.query("SELECT * FROM users WHERE id=?;", [tag])
      .then((table) => {
          // Send HTTPS, promises return the table access rows at 0 and fields at 1
          res.send(table[0]);
        })
      .catch((err) => {
          // Do not throw error inside of promise
          console.log(err);
      });
  } else if (key == 1) {
      await pool.query("SELECT * FROM users;")
      .then((table) => {
          // Send HTTPS, promises return the table access rows at 0 and fields at 1
          res.send(table[0]);
        })
      .catch((err) => {
          // Do not throw error inside of promise
          console.log(err);
      });
  } else {
      await pool.query("SELECT * FROM users WHERE status=?;", [1])
      .then((table) => {
        // Send HTTPS, promises return the table access rows at 0 and fields at 1
        res.send(table[0]);
      })
      .catch((err) => {
          // Do not throw error inside of promise
          console.log(err);
      });
      // Successful HTTPS
    res.status(201);
  }
}

module.exports = { readController };
