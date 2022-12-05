const { logoutController } = require("../server/controllers/logout");

// Stubbing for req and res
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

//
it("should send a status of 200 on logout, deleting the session and cookie", () => {
  // Call controller
  logoutController(req, res);
  // Figure out how to chain functions in order to check if status 200 is called
  // See if req.logout has been called
  expect(req.logout).toHaveBeenCalledTimes(1);
});

// Actual status returned
it("should send a status of 400 if not logged in", () => {
  // Call controller with empty req
  logoutController(req_empty, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});
