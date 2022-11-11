const {
  deleteController,
} = require("../../../server/controllers/session/questionnaire/delete");

const pool = require("../../../server/utils/pool");

// Mocking the modules
jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

const req = {
  body: {
    questionnaire_id: "1",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 if there is no session", async () => {
  // Found no task
  await mPool.query.mockResolvedValueOnce([[], []]);
  await deleteController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 if task deleted", async () => {
  await mPool.query.mockResolvedValueOnce([
    [{ id: "questionnaire found" }],
    [],
  ]);
  // Delete questionnaire
  await mPool.execute.mockResolvedValueOnce([[], []]);
  await deleteController(req, res);
  expect(mPool.execute).toHaveBeenCalledWith(
    "DELETE FROM sel_questionnaire WHERE id=?",
    ["1"]
  );
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
