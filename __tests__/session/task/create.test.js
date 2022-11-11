const {
  createController,
} = require("../../../server/controllers/session/task/create");

const pool = require("../../../server/utils/pool");

// Mocking the modules
jest.mock("../../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

const req = {
  body: {
    session_id: "1",
    task_type: "work",
    task_name: "work",
    start_date: "11/10/22",
    due_date: "11/10/22",
    task_description: "work",
    status: "In progress",
    end_date: "11/10/22",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 400 if no session", async () => {
  await mPool.query.mockResolvedValueOnce([[], []]);
  await createController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 if created task", async () => {
  await mPool.query.mockResolvedValueOnce([[{ session_id: "1" }], []]);
  // Create task
  await mPool.execute.mockResolvedValueOnce([[], []]);
  await createController(req, res);
  expect(mPool.execute).toHaveBeenCalledWith(
    "INSERT INTO task (session_id, task_type, task_name, start_date, due_date, task_description, status, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
    [
      "1",
      "work",
      "work",
      "11/10/22",
      "11/10/22",
      "work",
      "In progress",
      "11/10/22",
    ]
  );
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
