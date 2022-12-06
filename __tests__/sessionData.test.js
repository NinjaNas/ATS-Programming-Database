const { sessionController } = require("../server/controllers/sessionData");

const pool = require("../server/utils/pool");

// Mocking the modules
jest.mock("../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing for req and res
const req = {
  user: [
    [
      {
        id: "1",
        first_name: "admin",
        last_name: "admin",
        email: "admin",
        type: "admin",
        password: "test",
      },
    ],
    [],
  ],
  query: {},
};

const req_query = {
  user: [
    [
      {
        id: "1",
        first_name: "admin",
        last_name: "admin",
        email: "admin",
        type: "admin",
        password: "test",
      },
    ],
    [],
  ],
  query: { query: "100" },
};

const req_student = {
  user: [
    [
      {
        id: "1",
        first_name: "student",
        last_name: "student",
        email: "student",
        type: "student",
        password: "test",
      },
    ],
    [],
  ],
  query: {},
};

const req_query_if_student = {
  user: [
    [
      {
        id: "1",
        first_name: "student",
        last_name: "student",
        email: "student",
        type: "student",
        password: "test",
      },
    ],
    [],
  ],
  query: { query: "100" },
};

const req_empty = {
  query: {},
};

const res = {
  sendStatus: jest.fn((x) => x),
  send: jest.fn((x) => x),
  status: jest.fn((x) => x),
};

it("should send a status of 400 if no session found", async () => {
  // Find session return no rows
  await mPool.query.mockResolvedValueOnce([[], []]);
  // Call controller with empty req
  await sessionController(req_empty, res);
  // Call to find session
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM session WHERE id=?;",
    []
  );
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 200 and the session for admin with no query", async () => {
  // Find session to see if there is an active session
  await mPool.query.mockResolvedValueOnce([[{ status: 0, id: "1" }], []]);
  // Find session to send to client
  await mPool.query.mockResolvedValueOnce([
    [{ data: "found session data" }],
    [],
  ]);
  // Call controller
  await sessionController(req, res);
  // Call to find session
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM session WHERE user_id=?;",
    ["1"]
  );
  // Call to find session
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM session WHERE id=?;",
    ["1"]
  );
  //Send call
  expect(res.send).toHaveBeenCalledWith({ data: "found session data" });
  // SendStatus call
  expect(res.status).toHaveBeenCalledWith(200);
});

it("should send a status of 200 and the session for admin with query", async () => {
  // Find session to send to client
  await mPool.query.mockResolvedValueOnce([
    [{ data: "found session data" }],
    [],
  ]);
  // Call controller with empty req
  await sessionController(req_query, res);
  // Call to find session
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM session WHERE id=?;",
    ["100"]
  );
  //Send call
  expect(res.send).toHaveBeenCalledWith({ data: "found session data" });
  // SendStatus call
  expect(res.status).toHaveBeenCalledWith(200);
});

it("should send a status of 200 and the session for student no with query", async () => {
  // Find session to see if there is an active session
  await mPool.query.mockResolvedValueOnce([[{ status: 0, id: "1" }], []]);
  // Find session to send to client
  await mPool.query.mockResolvedValueOnce([
    [{ data: "found session data" }],
    [],
  ]);
  // Call controller
  await sessionController(req_student, res);
  // Call to find session
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM session WHERE user_id=?;",
    ["1"]
  );
  // Call to find session
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT * FROM session WHERE id=?;",
    ["1"]
  );
  //Send call
  expect(res.send).toHaveBeenCalledWith({ data: "found session data" });
  // SendStatus call
  expect(res.status).toHaveBeenCalledWith(200);
});

it("should send a status of 401 and the session for student with query", async () => {
  // Call controller with empty req
  await sessionController(req_query_if_student, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(401);
});
