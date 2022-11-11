const {
  updateController,
} = require("../../../server/controllers/session/day/update");

const pool = require("../../../server/utils/pool");

// Mocking the modules
jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {
  body: {
    type: "N/A",
    attendance_day: "11/10/22",
    status: "",
    reason_missed: "",
    id: "1",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when day does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if email exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  await updateController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when day does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if email exists and grabs values
  await mPool.query.mockResolvedValueOnce([
    [{ status: "success", reason_missed: "miss" }],
    [],
  ]);
  // Update values
  await mPool.execute.mockResolvedValueOnce([[], []]);
  await updateController(req, res);
  expect(mPool.execute).toHaveBeenCalledWith(
    "UPDATE task SET (type, attendance_day, status, reason_missed) WHERE id=(id) VALUES (?, ?, ?, ?, ?);",
    ["N/A", "11/10/22", "success", "miss", "1"]
  );
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
