const { logoutController } = require("../server/controllers/logout");

const req = {
  user: {
    first_name: "admin",
    last_name: "admin",
    email: "admin",
    type: "admin",
    password: "test",
  },
  logout: jest.fn((x) => x),
  session: {
    destroy: jest.fn((x) => x),
  },
};

const req_empty = {};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 200 on logout, deleting the session and cookie", () => {
  logoutController(req, res);
  // Figure out how to chain functions in order to check if status 200 is called
  expect(req.session.destroy).toHaveBeenCalledTimes(1);
});

it("should send a status of 400 if not logged in", () => {
  logoutController(req_empty, res);
  // Figure out how to chain functions in order to check if status 200 is called
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});
