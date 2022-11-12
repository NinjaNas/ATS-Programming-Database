const pool = require("../../utils/pool");

async function readController(req, res) {
  // Get user ID from req body
  const { key, tag, tag2 } = req.body;

  let [rows, fields] = await pool
    .query("SELECT type FROM users WHERE id=?;", [user_id])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

  if (rows.length) {
    //0 key reads names, 1 key reads UUID, 2 key outputs all, 3 key outputs active
    if (key == 0) {
        let [rows, fields] = await pool
        .query("SELECT * FROM users WHERE first_name=?;", [tag])
        .then((table) => {
            // Send HTTPS, promises return the table access rows at 0 and fields at 1
            res.send(table[0]);
          })
        .catch((err) => {
            // Do not throw error inside of promise
            console.log(err);
        });
    }
    else if (key == 1) {
        let [rows, fields] = await pool
        .query("SELECT * FROM users WHERE id=?;", [tag])
        .then((table) => {
            // Send HTTPS, promises return the table access rows at 0 and fields at 1
            res.send(table[0]);
          })
        .catch((err) => {
            // Do not throw error inside of promise
            console.log(err);
        });
    } else if (key == 2) {
        let [rows, fields] = await pool
        .query("SELECT * FROM users;")
        .then((table) => {
            // Send HTTPS, promises return the table access rows at 0 and fields at 1
            res.send(table[0]);
          })
        .catch((err) => {
            // Do not throw error inside of promise
            console.log(err);
        });
    } else {
        let [rows, fields] = await pool
        .query("SELECT * FROM users WHERE status=?;", ["1"])
        .then((table) => {
            // Send HTTPS, promises return the table access rows at 0 and fields at 1
            res.send(table[0]);
          })
        .catch((err) => {
            // Do not throw error inside of promise
            console.log(err);
        });
    }
  } else {
    res.sendStatus(400);
  }
  // Successful HTTPS
  res.sendStatus(201);
}

module.exports = { deleteController };
