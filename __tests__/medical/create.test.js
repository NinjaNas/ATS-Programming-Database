const { createController } = require("../../server/controllers/medical/create");
const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {
  body: {
    contact_name: "test",
    contact_relationship: "test",
    contact_phone: "test",
    physician: "test",
    hospital: "test",
    medical_concerns: "test",
    allergies_list: "test",
    allergies: "test",
    id: "1",
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
  await mPool.query.mockResolvedValueOnce([[{ id: "1", type: "student" }], []]);
  // Create medical
  await mPool.execute.mockResolvedValueOnce([]);
  // Use controller
  await createController(req, res);
  // Call to create medical
  expect(mPool.execute).toHaveBeenCalledWith(
    "INSERT INTO medical (user_id, contact_name, contact_relationship, contact_phone, physician, hospital, medical_concerns, allergies, allergies_list) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
    ["1", "test", "test", "test", "test", "test", "test", "test", "test"]
  );
  // Status call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
