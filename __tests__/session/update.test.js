const { updateController } = require("../../server/controllers/session/update");
const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {
  body: {
    intake_date: "11/10/22",
    grade: "A",
    school_id: "N/A",
    school_admin: "",
    social_worker: "N/A",
    school_counselor: "N/A",
    pickup: "",
    session_id: "1",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when session does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if session exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  await updateController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when session does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if session exists and grabs values
  await mPool.query.mockResolvedValueOnce([
    [{ school_admin: "success", pickup: "0" }],
    [],
  ]);
  // Update values
  await mPool.execute.mockResolvedValueOnce([[], []]);
  await updateController(req, res);
  expect(mPool.execute).toHaveBeenCalledWith(
    "UPDATE session SET (intake_date, grade, school, school_administrator, social_worker, school_counselor, student_pickup) WHERE id=(session_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
    ["11/10/22", "A", "N/A", "success", "N/A", "N/A", "0", "1"]
  );
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
