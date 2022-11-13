function userController(req, res) {
  console.log("Sent user");
  res.send(req.user);
  res.status(200);
}

module.exports = { userController };
