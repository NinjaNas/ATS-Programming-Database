const { userController } = require("../server/controllers/userData");

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

it("should send a status of 401 if not logged in", async () => {
  // Call controller with empty req
  await userController(req_empty, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(401);
});

it("should send a status of 200 and the user for admin with no query", async () => {
  // Call controller
  await userController(req, res);
  //Send call
  expect(res.send).toHaveBeenCalledWith([
    [
      {
        email: "admin",
        first_name: "admin",
        id: "1",
        last_name: "admin",
        password: "test",
        type: "admin",
      },
    ],
    [],
  ]);
  // SendStatus call
  expect(res.status).toHaveBeenCalledWith(200);
});

it("should send a status of 200 and the user for admin with query", async () => {
  // Find user to send to client
  await mPool.query.mockResolvedValueOnce([[{ data: "found user data" }], []]);
  // Call controller with empty req
  await userController(req_query, res);
  // Call to find user
  expect(mPool.query).toHaveBeenCalledWith("SELECT * FROM user WHERE id=?;", [
    "100",
  ]);
  //Send call
  expect(res.send).toHaveBeenCalledWith([{ data: "found user data" }]);
  // SendStatus call
  expect(res.status).toHaveBeenCalledWith(200);
});

it("should send a status of 200 and the user for student no with query", async () => {
  // Call controller
  await userController(req_student, res);
  //Send call
  expect(res.send).toHaveBeenCalledWith([
    [
      {
        email: "student",
        first_name: "student",
        id: "1",
        last_name: "student",
        password: "test",
        type: "student",
      },
    ],
    [],
  ]);
  // SendStatus call
  expect(res.status).toHaveBeenCalledWith(200);
});

it("should send a status of 401 and the user for student with query", async () => {
  // Call controller with empty req
  await userController(req_query_if_student, res);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(401);
});
