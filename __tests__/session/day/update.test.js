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
    status: null,
    reason_missed: null,
    id: "1",
  },
};

const req2 = {
  body: {
    type: "N/A",
    attendance_day: "11/10/22",
    status: null,
    reason_missed: null,
    id: "1",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when day does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if day exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when day does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if day exists and grabs values
  await mPool.query.mockResolvedValueOnce([[{ id: "1" }], []]);
  // Update values
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req2, res);
  // Find day
  expect(mPool.query).toHaveBeenCalledWith("SELECT * FROM day WHERE id=?;", [
    "1",
  ]);
  // Call to update day
  expect(mPool.query).toHaveBeenCalledWith("UPDATE day SET ? WHERE id=?;", [
    { attendance_day: "11/10/22", type: "N/A" },
    "1",
  ]);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
