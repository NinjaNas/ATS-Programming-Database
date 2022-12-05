const {
  deleteController,
} = require("../../../server/controllers/session/task/delete");

const pool = require("../../../server/utils/pool");

jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing for req and res
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
  // Call controller
  await deleteController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 if task deleted", async () => {
  // Found task
  await mPool.query.mockResolvedValueOnce([[{ id: "task found" }], []]);
  // Delete task
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Call controller
  await deleteController(req, res);
  // Call delete task
  expect(mPool.execute).toHaveBeenCalledWith("DELETE FROM task WHERE id=?", [
    "1",
  ]);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
