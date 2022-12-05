const {
  updateController,
} = require("../../../server/controllers/session/questionnaire/update");

const pool = require("../../../server/utils/pool");

// Mocking the modules
jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {
  body: {
    session_id: "1",
    questionnaire_date: "11/10/22",
    type: "sel",
    question_strengths: "N/A",
    question_help: "N/A",
    question_pride: "N/A",
    question_relationships: "N/A",
    question_collaboration: "N/A",
    question_composure: "N/A",
    question_goals: "N/A",
    status: null,
    notes: null,
  },
};

const req2 = {
  body: {
    session_id: "1",
    questionnaire_date: "11/10/22",
    type: "sel",
    question_strengths: "N/A",
    question_help: "N/A",
    question_pride: "N/A",
    question_relationships: "N/A",
    question_collaboration: "N/A",
    question_composure: "N/A",
    question_goals: "N/A",
    status: null,
    notes: null,
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when questionnaire does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if questionnaire exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when questionnaire does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if questionnaire exists and grabs values
  await mPool.query.mockResolvedValueOnce([[{ id: "1" }], []]);
  // Update values
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req2, res);
  // Find sel_questionnaire
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM sel_questionnaire WHERE session_id=? AND type=?;",
    ["1", "sel"]
  );
  // Call to update sel_questionnaire
  expect(mPool.query).toHaveBeenCalledWith(
    "UPDATE sel_questionnaire SET ? WHERE session_id=?;",
    [
      {
        question_collaboration: "N/A",
        question_composure: "N/A",
        question_goals: "N/A",
        question_help: "N/A",
        question_pride: "N/A",
        question_relationships: "N/A",
        question_strengths: "N/A",
        questionnaire_date: "11/10/22",
        type: "sel",
      },
      "1",
    ]
  );
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
