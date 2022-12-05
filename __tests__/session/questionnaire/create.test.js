const {
  createController,
} = require("../../../server/controllers/session/questionnaire/create");

const pool = require("../../../server/utils/pool");

// Mocking the modules
jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing req and res
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
    status: "working on it",
    notes: "N/A",
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

it("should send a status of 201 if created questionnaire", async () => {
  // Found session
  await mPool.query.mockResolvedValueOnce([[{ session_id: "1" }], []]);
  // Create questionnaire
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Call controller
  await createController(req, res);
  // Call to create questionnaire
  expect(mPool.execute).toHaveBeenCalledWith(
    "INSERT INTO sel_questionnaire (session_id, questionnaire_date, type, question_strengths, question_help, question_pride, question_relationships, question_collaboration, question_composure, question_goals, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
    [
      "1",
      "11/10/22",
      "sel",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "working on it",
      "N/A",
    ]
  );
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
