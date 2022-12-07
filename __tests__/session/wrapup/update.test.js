const {
  updateController,
} = require("../../../server/controllers/session/wrapup/update");

const pool = require("../../../server/utils/pool");

jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {
  body: {
    id: "1",
    meeting_date: "1",
    meeting_time: "1",
    location: null,
    family_rep: null,
    family_rep_attend: null,
    school_rep: "1",
    school_rep_attend: "1",
    other_rep: "1",
    other_rep_attend: "1",
    parent_translator: null,
    school_translator: "1",
    outside_translator: "1",
    court_involved: "1",
    court_counselor: "1",
    meeting_status: "1",
    performing_admin: "1",
    notes: null,
  },
};

const req2 = {
  body: {
    id: "1",
    meeting_date: "1",
    meeting_time: "1",
    location: null,
    family_rep: null,
    family_rep_attend: null,
    school_rep: "1",
    school_rep_attend: "1",
    other_rep: "1",
    other_rep_attend: "1",
    parent_translator: null,
    school_translator: "1",
    outside_translator: "1",
    court_involved: "1",
    court_counselor: "1",
    meeting_status: "1",
    performing_admin: "1",
    notes: null,
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when wrapup does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if wrapup exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when wrapup does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if wrapup exists
  await mPool.query.mockResolvedValueOnce([[{ id: 1 }], []]);
  // Update values
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req2, res);
  // Call get wrapup
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM wrap_up_meeting WHERE id=?;",
    ["1"]
  );
  // Call update wrapup
  expect(mPool.query).toHaveBeenCalledWith(
    "UPDATE wrap_up_meeting SET ? WHERE id=?;",
    [
      {
        court_counselor: "1",
        court_involved: "1",
        meeting_date: "1",
        meeting_status: "1",
        meeting_time: "1",
        other_rep: "1",
        other_rep_attend: "1",
        outside_translator: "1",
        performing_admin: "1",
        school_rep: "1",
        school_rep_attend: "1",
        school_translator: "1",
      },
      "1",
    ]
  );
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
