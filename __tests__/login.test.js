const { loginController } = require("../server/controllers/login");

const req = {
  user: {
    first_name: "admin",
    last_name: "admin",
    email: "admin",
    type: "admin",
    password: "test",
  },
};

const res = {
  send: jest.fn((x) => x),
  status: jest.fn((x) => x),
};

it("should send a status of 200 on login and send the user type", () => {
  loginController(req, res);
  expect(res.send).toHaveBeenCalledWith("admin");
  expect(res.status).toHaveBeenCalledWith(200);
});
