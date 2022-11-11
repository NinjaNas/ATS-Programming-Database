const { deleteController } = require("../../server/controllers/session/delete");
const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

const req = {
  body: {
    session_id: "1",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 if there is no session", async () => {
  // Found no session
  await mPool.query.mockResolvedValueOnce([[], []]);
  await deleteController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 if session deleted", async () => {
  await mPool.query.mockResolvedValueOnce([[{ id: "user found" }], []]);
  // Delete task, sel, day
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Delete session
  await mPool.execute.mockResolvedValueOnce([[], []]);
  await deleteController(req, res);
  expect(mPool.execute).toHaveBeenCalledWith(
    "DELETE task, sel_questionnaire, day FROM task INNER JOIN sel_questionnaire INNER JOIN day WHERE session_id=?",
    ["1"]
  );
  expect(mPool.execute).toHaveBeenCalledWith("DELETE FROM session WHERE id=?", [
    "1",
  ]);
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
