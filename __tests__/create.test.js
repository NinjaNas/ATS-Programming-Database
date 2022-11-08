const { createController } = require("../server/controllers/create");
const { hash } = require("../server/utils/bcrypt");
const pool = require("../server/utils/pool");

// Mocking the modules
jest.mock("../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {
  body: {
    first_name: "admin",
    last_name: "admin",
    email: "",
    type: "admin",
    intake_date: "11/1/2022",
    school_admin: "school",
    social_worker: "social",
    school_counselor: "counselor",
    pickup: 1,
  },
};

const res = {
  // Chained functions
  // status: jest.fn((x) => ({
  //   send: jest.fn((x) => x),
  // })),
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when user doesn't exist and send back a msg object", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  await mPool.query.mockResolvedValueOnce([[{}], [{}]]);
  await createController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});
