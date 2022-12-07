const {
  createController,
} = require("../../../server/controllers/session/wrapup/create");
const pool = require("../../../server/utils/pool");

// Mocking the modules
jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {
  body: {
    session_id: "1",
    meeting_date: "1",
    meeting_time: "1",
    location: "1",
    family_rep: "1",
    family_rep_attend: "1",
    school_rep: "1",
    school_rep_attend: "1",
    other_rep: "1",
    other_rep_attend: "1",
    parent_translator: "1",
    school_translator: "1",
    outside_translator: "1",
    court_involved: "1",
    court_counselor: "1",
    meeting_status: "1",
    performing_admin: "1",
    notes: "test",
  },
};

const res = {
  // Chained functions
  // status: jest.fn((x) => ({
  //   send: jest.fn((x) => x),
  // })),
  sendStatus: jest.fn((x) => x),
  send: jest.fn((x) => x),
  status: jest.fn((x) => x),
};

it("should send a status of 400 when session does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if session exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await createController(req, res);
  // Actual send and status returned
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when values are inserted into the DB table", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if session exists
  await mPool.query.mockResolvedValueOnce([[{ id: "1" }], []]);
  // Create wrapup
  await mPool.execute.mockResolvedValueOnce([]);
  // Use controller
  await createController(req, res);
  // Call to create wrapup
  expect(mPool.execute).toHaveBeenCalledWith(
    "INSERT INTO wrap_up_meeting (session_id, meeting_date, meeting_time, location, family_rep, family_rep_attend, school_rep, school_rep_attend, other_rep, other_rep_attend, parent_translator, school_translator, outside_translator, court_involved, court_counselor, meeting_status, performing_admin, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
    [
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "test",
    ]
  );
  // Status call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
