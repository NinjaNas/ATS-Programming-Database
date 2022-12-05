const { deleteController } = require("../../server/controllers/user/delete");
const pool = require("../../server/utils/pool");

// Mocking the modules
jest.mock("../../server/utils/pool");

// Mocking pool connection
const mPool = jest.mocked(pool);

// Stubbing for req and res
const req_empty = {
  body: {},
};

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

const req_not_student = {
  body: {
    first_name: "student",
    last_name: "student",
    email: "student",
    type: "parent",
    password: "test",
    user_id: "2",
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

it("should send a status of 201 on delete of user", async () => {
  // Delete user
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Call controller for a non student user
  await deleteController(req_not_student, res);
  expect(mPool.execute).toHaveBeenCalledWith("DELETE FROM user WHERE id=?", [
    "2",
  ]);
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});

it("should send a status of 400 on delete of main admin user", async () => {
  // Call controller
  await deleteController(req, res);
  // Actual send and status return
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 400 if there is no user", async () => {
  // Call controller for no user
  await deleteController(req_empty, res);
  // Actual send and status return
  expect(res.sendStatus).toHaveBeenCalledWith(400);
});

it("should send a status of 201 on delete of student user", async () => {
  // Found session id attached to user
  await mPool.query.mockResolvedValueOnce([[{ id: "student" }], []]);
  // Delete task, sel, day
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Delete session
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Delete demographics
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Delete user
  await mPool.execute.mockResolvedValueOnce([[], []]);
  // Call controller for a student user
  await deleteController(req_student, res);
  // Call to get session id
  expect(mPool.query).toHaveBeenCalledWith(
    "SELECT id FROM session WHERE user_id=?;",
    ["2"]
  );
  // Call to delete task, sel, day
  expect(mPool.execute).toHaveBeenCalledWith(
    "DELETE task, sel_questionnaire, day FROM task INNER JOIN sel_questionnaire ON task.session_id = sel_questionnaire.session_id INNER JOIN day ON task.session_id = day.session_id WHERE task.session_id=?",
    ["student"]
  );
  // Call to delete session
  expect(mPool.execute).toHaveBeenCalledWith("DELETE FROM session WHERE id=?", [
    "student",
  ]);
  // Call to delete demographics
  expect(mPool.execute).toHaveBeenCalledWith(
    "DELETE FROM demographics WHERE user_id=?",
    ["2"]
  );
  // Call to delete user
  expect(mPool.execute).toHaveBeenCalledWith("DELETE FROM user WHERE id=?", [
    "2",
  ]);
  // SendStatus call
  expect(res.sendStatus).toHaveBeenCalledWith(201);
});
