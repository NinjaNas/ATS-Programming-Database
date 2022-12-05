const { createController } = require("../../server/controllers/session/create");

const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing req and res
const req = {
  body: {
    user_id: "1",
    intake_date: "11/10/22",
    consented: "yes",
    grade: "A",
    school: "1",
    school_admin: "N/A",
    social_worker: "N/A",
    school_counselor: "N/A",
    student_pickup: "0",
    status: "1",
    notes: "n/a",
  },
};

const res = {
  // Chained functions
  // status: jest.fn((x) => ({
  //   send: jest.fn((x) => x),
  // })),
  sendStatus: jest.fn((x) => x),
  status: jest.fn((x) => x),
  send: jest.fn((x) => x),
};

it("should send a status of 400 if no user", async () => {
  // Found no user
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await createController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 if created session", async () => {
  // Found a user
  await mPool.query.mockResolvedValueOnce([[{ user_id: "1" }], []]);
  // Create session
  await mPool.execute.mockResolvedValueOnce([{ insertId: "1" }]);
  // Call controller
  await createController(req, res);
  // Call create session
  expect(mPool.execute).toHaveBeenCalledWith(
    "INSERT INTO session (user_id, intake_date, consented, grade, school, school_administrator, social_worker, school_counselor, student_pickup, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
    ["1", "11/10/22", "yes", "A", "1", undefined, "N/A", "N/A", "0", "1", "n/a"]
  );
  // Send call
  expect(res.send).toHaveBeenCalledWith({ session_id: "1" });
  // Status call
  expect(res.status).toHaveBeenCalledWith(201);
});
