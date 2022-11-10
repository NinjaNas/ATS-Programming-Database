const { deleteController } = require("../../server/controllers/user/delete");
const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

const req = {
  body: {
    first_name: "admin",
    last_name: "admin",
    email: "admin",
    type: "admin",
    password: "test",
    user_id: "1",
  },
};

const req_student = {
  body: {
    first_name: "student",
    last_name: "student",
    email: "student",
    type: "student",
    password: "test",
    user_id: "2",
  },
};

const res = {
  sendStatus: jest.fn((x) => x),
};

it("should send a status of 201 on delete of admin user", async () => {
  // Found user with type admin
  await mPool.query.mockResolvedValueOnce([[{ type: "admin" }], []]);
  // Executed delete
  await mPool.execute.mockResolvedValueOnce([[], []]);
  await deleteController(req, res);
  expect(mPool.execute).toHaveBeenCalledWith("DELETE FROM users WHERE id=?", [
    "1",
  ]);
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});

it("should send a status of 400 if there is no user", async () => {
  // Found no user
  await mPool.query.mockResolvedValueOnce([[], []]);
  await deleteController(req, res);
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 on delete of student user", async () => {
  // Found student user
  await mPool.query.mockResolvedValueOnce([[{ type: "student" }], []]);
  // Find user in session
  await mPool.query.mockResolvedValueOnce([[{ id: "2" }], []]);
  // Delete task, sel, day
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Delete Session
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Delete Demographics
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Delete Student
  await mPool.execute.mockResolvedValueOnce([[], []]);

  await deleteController(req_student, res);

  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT type FROM users WHERE id=?;",
    ["2"]
  );

  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT id FROM session WHERE user_id=?;",
    ["2"]
  );
  expect(mPool.execute).toHaveBeenCalledWith(
    "DELETE task, sel_questionnaire, day FROM task INNER JOIN sel_questionnaire INNER JOIN day WHERE session_id=?",
    ["2"]
  );
  expect(mPool.execute).toHaveBeenCalledWith("DELETE FROM session WHERE id=?", [
    "2",
  ]);
  expect(mPool.execute).toHaveBeenCalledWith(
    "DELETE FROM demographics WHERE user_id=?",
    ["2"]
  );
  expect(mPool.execute).toHaveBeenCalledWith("DELETE FROM users WHERE id=?", [
    "2",
  ]);
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
