const { deleteController } = require("../../server/controllers/session/delete");
const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing for req and res
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
  // Call controller
  await deleteController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 if session deleted", async () => {
  // Found user
  await mPool.query.mockResolvedValueOnce([[{ id: "user found" }], []]);
  // Delete task, sel, day
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Delete session
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Call controller
  await deleteController(req, res);
  // Call delete task, sel, day
  expect(mPool.execute).toHaveBeenCalledWith(
    "DELETE task, sel_questionnaire, day FROM task INNER JOIN sel_questionnaire ON task.session_id = sel_questionnaire.session_id INNER JOIN day ON task.session_id = day.session_id WHERE task.session_id=?",
    ["1"]
  );
  // Call delete session
  expect(mPool.execute).toHaveBeenCalledWith("DELETE FROM session WHERE id=?", [
    "1",
  ]);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
