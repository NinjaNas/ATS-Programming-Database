const pool = require("../../../utils/pool");

async function indexController(req, res) {
  /**
   * .query(), parameter substitution is handled on the client, including objects
   * 'SELECT * FROM questionnaire' is valid sql to select everything from the table 'questionnaire'
   *  rows is an array containing each row as an object
   *  fields is an array containing each field as an object
   */
  await pool
    .query("SELECT * FROM sel_questionnaire;")
    .then((table) => {
      // Send HTTPS, promises return the table access rows at 0 and fields at 1
      res.send(table[0]);
      res.status(200);
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
}

module.exports = { indexController };
