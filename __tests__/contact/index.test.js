const { indexController } = require("../../server/controllers/contact/index");
const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

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
  // Select contact table
  await mPool.query.mockResolvedValueOnce([[{ test: "value" }], []]);
  // Call controller
  await indexController(req, res);
  // Call to select contact table
  expect(mPool.query).toHaveBeenCalledWith("SELECT * FROM contact;");
  // Actual send return
  expect(res.send).toHaveBeenCalledWith([{ test: "value" }]);
  // Status call
  expect(res.status).toHaveBeenCalledWith(200);
});
