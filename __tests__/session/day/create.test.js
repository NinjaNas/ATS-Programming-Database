const {
  createController,
} = require("../../../server/controllers/session/day/create");

const pool = require("../../../server/utils/pool");

// Mocking the modules
jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing req and res
const req = {
  body: {
    type: "N/A",
    attendance_day: "11/10/22",
    status: "working on it",
    reason_missed: "miss",
    session_id: "1",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 if no session", async () => {
  // Found no session
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await createController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 if created day", async () => {
  // Found session
  await mPool.query.mockResolvedValueOnce([[{ session_id: "1" }], []]);
  // Create day
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Call controller
  await createController(req, res);
  // Call to create day
  expect(mPool.execute).toHaveBeenCalledWith(
    "INSERT INTO day (session_id, type, attendance_day, status, reason_missed) VALUES (?, ?, ?, ?, ?);",
    ["1", "N/A", "11/10/22", "working on it", "miss"]
  );
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
