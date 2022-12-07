const { createController } = require("../../server/controllers/contact/create");
const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {
  body: {
    user_id: "1",
    phone: "test",
    address: "test",
    city: "test",
    zip: "test",
    status: "test",
  },
};

const res = {
  // Chained functions
  // status: jest.fn((x) => ({
  //   send: jest.fn((x) => x),
  // })),
  sendStatus: jest.fn((x) => x),
  send: jest.fn((x) => x),
  status: jest.fn((x) => x),
};

it("should send a status of 400 when user does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if user exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await createController(req, res);
  // Actual send and status returned
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when values are inserted into the DB table", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if user exists
  await mPool.query.mockResolvedValueOnce([[{ id: "1" }], []]);
  // Create contact
  await mPool.execute.mockResolvedValueOnce([]);
  // Use controller
  await createController(req, res);
  // Call to create contact
  expect(mPool.execute).toHaveBeenCalledWith(
    "INSERT INTO contact (user_id, phone, address, city, zip, status) VALUES (?, ?, ?, ?, ?, ?);",
    ["1", "test", "test", "test", "test", "test"]
  );
  // Status call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
