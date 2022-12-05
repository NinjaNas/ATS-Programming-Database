const {
  updateController,
} = require("../../server/controllers/demographics/update");
const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {
  body: {
    date_of_birth: null,
    gender: "N/A",
    gender_specify: "N/A",
    race_bl: "N/A",
    race_ai: "N/A",
    race_as: "N/A",
    race_nhpi: "N/A",
    race_wh: "N/A",
    race_other: "N/A",
    race_other_specify: "N/A",
    ethnicity: "N/A",
    free_lunch: null,
    user_id: "1",
  },
};

const req2 = {
  body: {
    date_of_birth: null,
    gender: "N/A",
    gender_specify: "N/A",
    race_bl: "N/A",
    race_ai: "N/A",
    race_as: "N/A",
    race_nhpi: "N/A",
    race_wh: "N/A",
    race_other: "N/A",
    race_other_specify: "N/A",
    ethnicity: "N/A",
    free_lunch: null,
    user_id: "1",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when demographics does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if demographics exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when demographics does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if demographics exists
  await mPool.query.mockResolvedValueOnce([[{ demographics_id: "1" }], []]);
  // Update values
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req2, res);
  // Call to find demographics
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM demographics WHERE user_id=?;",
    ["1"]
  );
  // Call to update demographics
  expect(mPool.query).toHaveBeenCalledWith(
    "UPDATE demographics SET ? WHERE user_id=?;",
    [
      {
        ethnicity: "N/A",
        gender: "N/A",
        gender_specify: "N/A",
        race_ai: "N/A",
        race_as: "N/A",
        race_bl: "N/A",
        race_nhpi: "N/A",
        race_other: "N/A",
        race_other_specify: "N/A",
        race_wh: "N/A",
      },
      "1",
    ]
  );
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
