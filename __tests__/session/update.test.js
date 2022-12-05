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
    id: "1",
  },
};

const req2 = {
  body: {
    intake_date: "11/10/22",
    grade: "A",
    school_id: "N/A",
    school_admin: "",
    social_worker: "N/A",
    school_counselor: "N/A",
    pickup: "",
    id: "1",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when session does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if session exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when session does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if session exists
  await mPool.query.mockResolvedValueOnce([[{ id: "1" }], []]);
  // Update values
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req2, res);
  // Call to find session
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM session WHERE id=?;",
    ["1"]
  );
  // Call to update session
  expect(mPool.query).toHaveBeenCalledWith("UPDATE session SET ? WHERE id=?;", [
    {
      grade: "A",
      intake_date: "11/10/22",
      pickup: "",
      school_admin: "",
      school_counselor: "N/A",
      school_id: "N/A",
      social_worker: "N/A",
    },
    "1",
  ]);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
