const {
  indexController,
} = require("../../../server/controllers/session/task/index");

const pool = require("../../../server/utils/pool");

jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {};

const res = {
  send: jest.fn((x) => x),
  status: jest.fn((x) => x),
};

it("should send a status of 200 when sending a value", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Select task table
  await mPool.query.mockResolvedValueOnce([[{ test: "value" }], []]);
  await indexController(req, res);
  expect(mPool.query).toHaveBeenCalledWith("SELECT * FROM task;");
  expect(res.send).toHaveBeenCalledWith([{ test: "value" }]);
  expect(res.status).toHaveBeenCalledWith(200);
});
