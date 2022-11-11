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
    date_of_birth: "",
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
    free_lunch: "",
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
  await updateController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when demographics does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if demographics exists and grabs values
  await mPool.query.mockResolvedValueOnce([
    [{ date_of_birth: "success", free_lunch: "free" }],
    [],
  ]);
  // Update values
  await mPool.execute.mockResolvedValueOnce([[], []]);
  await updateController(req, res);
  expect(mPool.execute).toHaveBeenCalledWith(
    "UPDATE demographics SET (date_of_birth, gender, gender_specify, race_bl, race_ai, race_as, race_nhpi, race_wh, race_other, race_other_specify, ethnicity, free_lunch) WHERE id=(user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
    [
      "success",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "N/A",
      "free",
      "1",
    ]
  );
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
