const { createController } = require("../../server/controllers/session/create");

const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

const req = {
  body: {
    user_id: "1",
    intake_date: "11/10/22",
    grade: "A",
    school_id: "1",
    school_admin: "N/A",
    social_worker: "N/A",
    school_counselor: "N/A",
    pickup: "0",
  },
};

const res = {
  // Chained functions
  // status: jest.fn((x) => ({
  //   send: jest.fn((x) => x),
  // })),
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 if no user", async () => {
  await mPool.query.mockResolvedValueOnce([[], []]);
  await createController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 if created session", async () => {
  await mPool.query.mockResolvedValueOnce([[{ user_id: "1" }], []]);
  // Create session
  await mPool.execute.mockResolvedValueOnce([[], []]);
  await createController(req, res);
  expect(mPool.execute).toHaveBeenCalledWith(
    "INSERT INTO session (user_id, intake_date, grade, school_id, school_administrator, social_worker, school_counselor, student_pickup) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
    ["1", "11/10/22", "A", "1", "N/A", "N/A", "N/A", "0"]
  );
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
