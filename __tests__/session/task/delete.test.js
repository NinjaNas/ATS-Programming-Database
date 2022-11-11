const {
  deleteController,
} = require("../../../server/controllers/session/task/delete");

const pool = require("../../../server/utils/pool");

jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

const req = {
  body: {
    task_id: "1",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 if there is no task", async () => {
  // Found no task
  await mPool.query.mockResolvedValueOnce([[], []]);
  await deleteController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 if task deleted", async () => {
  await mPool.query.mockResolvedValueOnce([[{ id: "session found" }], []]);
  // Delete task
  await mPool.execute.mockResolvedValueOnce([[], []]);
  await deleteController(req, res);
  expect(mPool.execute).toHaveBeenCalledWith("DELETE FROM task WHERE id=?", [
    "1",
  ]);
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
