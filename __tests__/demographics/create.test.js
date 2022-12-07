const {
  createController,
} = require("../../server/controllers/demographics/create");
const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {
  body: {
    id: "1",
    date_of_birth: "1",
    gender: "1",
    gender_other: "n/a",
    race_bl: "1",
    race_ai: "1",
    race_as: "1",
    race_nhpi: "1",
    race_wh: "1",
    race_other: "n/a",
    race_other_specify: "n/a",
    ethnicity: "n/a",
    free_lunch: "yes",
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

it("should send a status of 400 when non student does exist", async () => {
  //   // Using a mocked query to return a promise [[rows],[fields]]
  // Check if user exists
  await mPool.query.mockResolvedValueOnce([[{ id: "1" }], []]);
  // Use controller
  await createController(req, res);
  // Status call
  expect(res.status).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when student does exist and values are inserted into the DB table", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if user exists
  await mPool.query.mockResolvedValueOnce([[{ id: "1", type: "student" }], []]);
  // Create demographics
  await mPool.execute.mockResolvedValueOnce([{ insertId: "1" }]);
  // Use controller
  await createController(req, res);
  // Call to create demographics
  expect(mPool.execute).toHaveBeenCalledWith(
    "INSERT INTO demographics (user_id, date_of_birth, gender, gender_other, race_bl, race_ai, race_as, race_nhpi, race_wh, race_other, race_other_specify, ethnicity, free_lunch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
    ["1", "1", "1", "n/a", "1", "1", "1", "1", "1", "n/a", "n/a", "n/a", "yes"]
  );
  // Actual send returned (returns user id)
  expect(res.send).toHaveBeenCalledWith({ demographics_id: "1" });
  // Status call
  expect(res.status).toHaveBeenCalledWith(201);
});
