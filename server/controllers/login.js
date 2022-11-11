function loginController(req, res) {
  console.log("Logged In");
  res.send(req.user.type);
  res.status(200);
}

module.exports = { loginController };
