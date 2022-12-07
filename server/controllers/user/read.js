const pool = require("../../utils/pool");

async function readController(req, res) {
  // Get user ID from req body
  const { key, tag } = req.query;

  //0 key reads UUID, 1 key outputs all acive students, 2 outputs students, -1 key outputs active
  if (key == 0) {
    await pool
      .query("SELECT * FROM user WHERE id=?;", [tag])
      .then((table) => {
        // Send HTTPS, promises return the table access rows at 0 and fields at 1
        res.send(table[0]);
      })
      .catch((err) => {
        // Do not throw error inside of promise
        console.log(err);
      });
  } else if (key == 1) {
    await pool
      .query("SELECT * FROM user WHERE status=? AND type=?;", [1, "student"])
      .then((table) => {
        // Send HTTPS, promises return the table access rows at 0 and fields at 1
        res.send(table[0]);
      })
      .catch((err) => {
        // Do not throw error inside of promise
        console.log(err);
      });
  } else if (key == 2) {
    await pool
      .query("SELECT * FROM user WHERE type='student';")
      .then((table) => {
        // Send HTTPS, promises return the table access rows at 0 and fields at 1
        res.send(table[0]);
      })
      .catch((err) => {
        // Do not throw error inside of promise
        console.log(err);
      });
  } else {
    await pool
      .query("SELECT * FROM user WHERE status=?;", [1])
      .then((table) => {
        // Send HTTPS, promises return the table access rows at 0 and fields at 1
        res.send(table[0]);
      })
      .catch((err) => {
        // Do not throw error inside of promise
        console.log(err);
      });
  }
  // Successful HTTPS
  res.status(201);
}

module.exports = { readController };
