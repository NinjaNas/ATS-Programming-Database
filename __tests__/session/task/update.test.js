const {
  updateController,
} = require("../../../server/controllers/session/task/update");

const pool = require("../../../server/utils/pool");

jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing data for req and res
const req = {
  body: {
    task_type: "work",
    task_name: "work",
    start_date: "11/10/22",
    due_date: "11/10/22",
    task_description: "",
    status: "",
    end_date: "11/10/22",
    task_id: "1",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 when task does not exist", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if task exists
  await mPool.query.mockResolvedValueOnce([[], []]);
  await updateController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when task does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if task exists and grabs values
  await mPool.query.mockResolvedValueOnce([
    [{ status: "success", task_description: "working on it" }],
    [],
  ]);
  // Update values
  await mPool.execute.mockResolvedValueOnce([[], []]);
  await updateController(req, res);
  expect(mPool.execute).toHaveBeenCalledWith(
    "UPDATE task SET (task_type, task_name, start_date, due_date, task_description, status, end_date) WHERE id=(task_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
    [
      "work",
      "work",
      "11/10/22",
      "11/10/22",
      "working on it",
      "success",
      "11/10/22",
      "1",
    ]
  );
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
