const { createController } = require("../../server/controllers/user/create");
const { hash } = require("../../server/utils/bcrypt");
const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");
jest.mock("../../server/utils/bcrypt", () => ({
  hash: jest.fn(() => "hash_password"),
}));

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {
  body: {
    first_name: "admin",
    last_name: "admin",
    email: "admin",
    pronouns: "n/a",
    created_at: "1/1",
    type: "admin",
    password: "test",
    notes: "notes",
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

it("should send a status of 400 when email does exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if email exists
  await mPool.query.mockResolvedValueOnce([[{ email: "admin" }], []]);
  // Call controller
  await createController(req, res);
  // Actual send and status returned
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when email does not exist, password is hashed, and values are inserted into the DB table", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if email exists (no rows returned)
  await mPool.query.mockResolvedValueOnce([[], []]);
  // User inserted into table
  await mPool.execute.mockResolvedValueOnce([{ insertId: "1" }]);
  // Use controller
  await createController(req, res);
  // Hash function called
  expect(hash).toHaveBeenCalledWith("test");
  // Call to create user
  expect(mPool.execute).toHaveBeenCalledWith(
    "INSERT INTO user (first_name, last_name, email, pronouns, created_at, type, password_hash, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
    ["admin", "admin", "admin", "n/a", "1/1", "admin", "hash_password", "notes"]
  );
  // Actual send returned (returns user id)
  expect(res.send).toHaveBeenCalledWith({ id: "1" });
  // Status call
  expect(res.status).toHaveBeenCalledWith(201);
});
