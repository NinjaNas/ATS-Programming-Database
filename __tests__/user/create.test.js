const { hashSync } = require("bcryptjs");
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
    type: "admin",
    password: "test",
  },
};

// Stubbing data for req and res
const req_student = {
  body: {
    first_name: "student",
    last_name: "student",
    email: "student",
    type: "student",
    password: "test",
    date_of_birth: "1/1/2000",
    gender: "M",
    gender_specify: "M",
    race_bl: false,
    race_ai: false,
    race_as: false,
    race_nhpi: false,
    race_wh: false,
    race_other: false,
    race_other_specify: "N/A",
    ethnicity: "N/A",
    free_lunch: "N/A",
  },
};

const res = {
  // Chained functions
  // status: jest.fn((x) => ({
  //   send: jest.fn((x) => x),
  // })),
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when email does exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  await mPool.query.mockResolvedValueOnce([[{ email: "admin" }], []]);
  await createController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when email does not exist, password is hashed, and values are inserted into the DB table", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  await mPool.query.mockResolvedValueOnce([[], []]);
  await mPool.execute.mockResolvedValueOnce([
    { fieldCount: 0, affectedRows: 1, insertId: "1" },
    undefined,
  ]);
  await createController(req, res);
  expect(hash).toHaveBeenCalledWith("test");
  expect(mPool.execute).toHaveBeenCalledWith(
    "INSERT INTO users (first_name, last_name, email, type, password_hash) VALUES (?, ?, ?, ?, ?);",
    ["admin", "admin", "admin", "admin", "hash_password"]
  );
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});

it("should send a status of 201 when email does exist, is a student, and inserted into the demographics table ", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  await mPool.query.mockResolvedValueOnce([[], []]);
  await mPool.execute.mockResolvedValueOnce([
    { fieldCount: 0, affectedRows: 1, insertId: "1" },
    undefined,
  ]);
  await mPool.query.mockResolvedValueOnce([[{ id: "1" }], []]);
  await mPool.execute.mockResolvedValueOnce([
    { fieldCount: 0, affectedRows: 1, insertId: "1" },
    undefined,
  ]);
  await createController(req_student, res);

  expect(hash).toHaveBeenCalledWith("test");
  expect(mPool.execute).toHaveBeenCalledWith(
    "INSERT INTO users (first_name, last_name, email, type, password_hash) VALUES (?, ?, ?, ?, ?);",
    ["student", "student", "student", "student", "hash_password"]
  );
  expect(res.sendStatus).toHaveBeenCalledWith(201);
  expect(mPool.execute).toHaveBeenCalledWith(
    "INSERT INTO demographics (user_id, date_of_birth, gender, gender_specify, race_bl, race_ai, race_as, race_nhpi, race_wh, race_other, race_other_specify, ethnicity, free_lunch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
    [
      "1",
      "1/1/2000",
      "M",
      "M",
      false,
      false,
      false,
      false,
      false,
      false,
      "N/A",
      "N/A",
      "N/A",
    ]
  );
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
