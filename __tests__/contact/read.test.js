const { readController } = require("../../server/controllers/contact/read");
const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req_1 = {
  query: { key: "1", tag: "1" },
};

const req_2 = {
  query: { key: "2" },
};

const req_tag = {
  query: { key: "0", tag: "1" },
};

const res = {
  send: jest.fn((x) => x),
  status: jest.fn((x) => x),
};

it("should send a status of 201 when sending key 0 and tag 1", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Expected query to select table
  await mPool.query.mockResolvedValueOnce([[{ test: "value" }], []]);
  // Call controller
  await readController(req_tag, res);
  // Call for selecting table
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM contact WHERE user_id=?;",
    ["1"]
  );
  // Actual send return
  expect(res.send).toHaveBeenCalledWith([{ test: "value" }]);
  // Status call
  expect(res.status).toHaveBeenCalledWith(201);
});

it("should send a status of 201 when sending key 1", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Expected query to select table
  await mPool.query.mockResolvedValueOnce([[{ test: "value" }], []]);
  // Call controller
  await readController(req_1, res);
  // Call for selecting table
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM contact WHERE id=?;",
    ["1"]
  );
  // Actual send return
  expect(res.send).toHaveBeenCalledWith([{ test: "value" }]);
  // Status call
  expect(res.status).toHaveBeenCalledWith(201);
});

it("should send a status of 201 when sending key 2", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Expected query to select table
  await mPool.query.mockResolvedValueOnce([[{ test: "value" }], []]);
  // Call controller
  await readController(req_2, res);
  // Call for selecting table
  expect(mPool.query).toHaveBeenCalledWith("SELECT * FROM contact;");
  // Actual send return
  expect(res.send).toHaveBeenCalledWith([{ test: "value" }]);
  // Status call
  expect(res.status).toHaveBeenCalledWith(201);
});
