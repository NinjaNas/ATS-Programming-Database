const { updateController } = require("../../server/controllers/medical/update");
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
    physician: null,
    hospital: "test",
    medical_concerns: null,
    allergies_list: "test",
    allergies: "test",
    user_id: "1",
  },
};

const req2 = {
  body: {
    contact_name: "test",
    contact_relationship: "test",
    contact_phone: "test",
    physician: null,
    hospital: "test",
    medical_concerns: null,
    allergies_list: "test",
    allergies: "test",
    user_id: "1",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when medical does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if demographics exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when medical does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if contact exists
  await mPool.query.mockResolvedValueOnce([[{ id: "1" }], []]);
  // Update values
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req2, res);
  // Call to find medical
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM medical WHERE user_id=?;",
    ["1"]
  );
  // Call to update medical
  expect(mPool.query).toHaveBeenCalledWith(
    "UPDATE medical SET ? WHERE user_id=?;",
    [
      {
        allergies: "test",
        allergies_list: "test",
        contact_name: "test",
        contact_phone: "test",
        contact_relationship: "test",
        hospital: "test",
      },
      "1",
    ]
  );
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
