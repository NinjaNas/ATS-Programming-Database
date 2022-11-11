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
    status: "",
    notes: "",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when questionnaire does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if questionnaire exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  await updateController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when questionnaire does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if questionnaire exists and grabs values
  await mPool.query.mockResolvedValueOnce([
    [{ status: "success", notes: "hello" }],
    [],
  ]);
  // Update values
  await mPool.execute.mockResolvedValueOnce([[], []]);
  await updateController(req, res);
  expect(mPool.execute).toHaveBeenCalledWith(
    "UPDATE session SET (questionnaire_date, question_strengths, question_help, question_pride, question_relationships, question_collaboration, question_composure, question_goals, status, notes) WHERE session_id=(session_id) AND type=(type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
    [
      "11/10/22",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "success",
      "hello",
      "1",
      "sel",
    ]
  );
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
