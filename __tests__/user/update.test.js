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
    email: null,
    pronoun: "admin",
    status: null,
    type: null,
    status: null,
    notes: null,
    user_id: "1",
    password: "test",
  },
};

const req2 = {
  body: {
    first_name: "admin",
    last_name: "admin",
    email: null,
    pronoun: "admin",
    status: null,
    type: null,
    status: null,
    notes: null,
    user_id: "1",
    password: "test",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when there is no user", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if user exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when user does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if user is valid
  await mPool.query.mockResolvedValueOnce([[{ id: 1 }], []]);
  // Update values
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req2, res);
  // Call hash function
  expect(hash).toHaveBeenCalledWith("test");
  // Call to find user
  expect(mPool.query).toHaveBeenCalledWith("SELECT * FROM user WHERE id=?;", [
    "1",
  ]);
  // Call to update user
  expect(mPool.query).toHaveBeenCalledWith("UPDATE user SET ? WHERE id=?;", [
    {
      first_name: "admin",
      last_name: "admin",
      password_hash: "hash_password",
      pronoun: "admin",
    },
    "1",
  ]);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
