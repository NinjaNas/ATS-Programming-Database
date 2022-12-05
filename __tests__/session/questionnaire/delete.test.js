const {
  deleteController,
} = require("../../../server/controllers/session/questionnaire/delete");

const pool = require("../../../server/utils/pool");

// Mocking the modules
jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing req and res
const req = {
  body: {
    questionnaire_id: "1",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 if there is no questionnaire", async () => {
  // Found no questionnaire
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await deleteController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 if task deleted", async () => {
  // Found questionnaire
  await mPool.query.mockResolvedValueOnce([[{ id: "1" }], []]);
  // Delete questionnaire
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Call controller
  await deleteController(req, res);
  // Call to delete questionnaire
  expect(mPool.execute).toHaveBeenCalledWith(
    "DELETE FROM sel_questionnaire WHERE id=?",
    ["1"]
  );
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
