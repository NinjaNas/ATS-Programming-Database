const { updateController } = require("../../server/controllers/contact/update");
const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {
  body: {
    id: "1",
    phone: "test",
    address: null,
    city: "test",
    zip: null,
    status: "test",
  },
};

const req2 = {
  body: {
    id: "1",
    phone: "test",
    address: null,
    city: "test",
    zip: null,
    status: "test",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when contact does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if demographics exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when contact does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if contact exists
  await mPool.query.mockResolvedValueOnce([[{ id: "1" }], []]);
  // Update values
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req2, res);
  // Call to find contact
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM contact WHERE id=?;",
    ["1"]
  );
  // Call to update contact
  expect(mPool.query).toHaveBeenCalledWith("UPDATE contact SET ? WHERE id=?;", [
    { city: "test", phone: "test", status: "test" },
    "1",
  ]);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
