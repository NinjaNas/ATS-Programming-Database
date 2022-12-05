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
    task_description: null,
    status: null,
    end_date: "11/10/22",
    task_id: "1",
  },
};

const req2 = {
  body: {
    task_type: "work",
    task_name: "work",
    start_date: "11/10/22",
    due_date: "11/10/22",
    task_description: null,
    status: null,
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
  // Call controller
  await updateController(req, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 when task does exist and update values when needed", async () => {
  // Using a mocked query to return a promise [[rows],[fields]]
  // Check if task exists
  await mPool.query.mockResolvedValueOnce([[{ id: 1 }], []]);
  // Update values
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller
  await updateController(req2, res);
  // Call get task
  expect(mPool.query).toHaveBeenCalledWith("SELECT * FROM task WHERE id=?;", [
    "1",
  ]);
  // Call update task
  expect(mPool.query).toHaveBeenCalledWith("UPDATE task SET ? WHERE id=?;", [
    {
      due_date: "11/10/22",
      end_date: "11/10/22",
      start_date: "11/10/22",
      task_name: "work",
      task_type: "work",
    },
    "1",
  ]);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
