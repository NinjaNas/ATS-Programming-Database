const { updateController } = require("../../server/controllers/user/update");
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
    type: "admin",
    status: "",
    notes: "",
    user_id: "1",
    password: "test",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when email does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if email exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  await updateController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when email does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if email exists and grabs values
  await mPool.query.mockResolvedValueOnce([
    [{ status: "success", notes: "from_db" }],
    [],
  ]);
  // Update values
  await mPool.execute.mockResolvedValueOnce([[], []]);
  await updateController(req, res);
  expect(hash).toHaveBeenCalledWith("test");
  expect(mPool.execute).toHaveBeenCalledWith(
    "UPDATE users SET (first_name, last_name, email, status, notes, password_hash) WHERE id=(user_id) VALUES(?, ?, ?, ?, ?, ?, ?);",
    ["admin", "admin", "admin", "success", "from_db", "hash_password", "1"]
  );
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
