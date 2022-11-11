const {
  deleteController,
} = require("../../../server/controllers/session/day/delete");

const pool = require("../../../server/utils/pool");

// Mocking the modules
jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

const req = {
  body: {
    day_id: "1",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 if there is no day", async () => {
  // Found no day
  await mPool.query.mockResolvedValueOnce([[], []]);
  await deleteController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 if day deleted", async () => {
  await mPool.query.mockResolvedValueOnce([[{ id: "day found" }], []]);
  // Delete questionnaire
  await mPool.execute.mockResolvedValueOnce([[], []]);
  await deleteController(req, res);
  expect(mPool.execute).toHaveBeenCalledWith("DELETE FROM day WHERE id=?", [
    "1",
  ]);
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
