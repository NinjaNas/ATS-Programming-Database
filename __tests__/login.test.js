const { loginController } = require("../server/controllers/login");

// Stubbing for req and res
const req = {
  user: {
    first_name: "admin",
    last_name: "admin",
    email: "admin",
    pronouns: "admin",
    created_at: "admin",
    type: "admin",
    password: "test",
    notes: "admin",
  },
};

const res = {
  send: jest.fn((x) => x),
  status: jest.fn((x) => x),
};

it("should send a status of 200 on login and send the user type", () => {
  // Call controller, no await here because not using pool
  loginController(req, res);
  // Send call
  expect(res.send).toHaveBeenCalledWith("admin");
  // Status call
  expect(res.status).toHaveBeenCalledWith(200);
});
