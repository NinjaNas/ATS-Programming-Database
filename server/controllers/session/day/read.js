const pool = require("../../../utils/pool");

async function readController(req, res) {
  // Get user ID from req body
  const { key, tag } = req.body;

  if (rows.length) {
    //0 key reads session_id, 1 key reads all 
    if (key == 0) {
        let [rows, fields] = await pool
        .query("SELECT * FROM day WHERE session_id=?;", [tag])
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
        .query("SELECT * FROM day;")
        .then((table) => {
            res.send(table[0]);
          })
        .catch((err) => {
            console.log(err);
        });
    }
  } else {
    res.sendStatus(400);
  }
  // Successful HTTPS
  res.sendStatus(201);
}

module.exports = { readController };