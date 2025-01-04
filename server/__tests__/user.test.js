const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models/");
const { hashPass } = require("../Helpers/bycrpts");
const { queryInterface } = sequelize;
const userTest1 = {
  email: "user1@gmail.com",
  password: hashPass("user1"),
};

const userTest2 = {
  email: "user2@gmail.com",
  password: hashPass("user2"),
};

beforeAll(async () => {

  await queryInterface.bulkInsert("Users", [
    {
      email: "user1@gmail.com",
      password: hashPass("user1"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterAll(async () => {
  queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Test login", () => {
  describe("Test login success", () => {
    test("Login success with status 200 OK", async () => {
      const res = await request(app).post("/login").send({
        email: "user1@gmail.com",
        password: "user1",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("Test login failed", () => {
    test("Without email, status 400", async () => {
      const res = await request(app).post("/login").send({
        password: "user1",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Email is required");
    });

    test("Without password, status 400", async () => {
      const res = await request(app).post("/login").send({
        email: "user1@gmail.com",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Password is required");
    });

    test("Email is invalid, status 401", async () => {
      const res = await request(app).post("/login").send({
        email: "user120@gmail.com",
        password: "user1",
      });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "Email or password is wrong");
    });

    test("Wrong password, status 401", async () => {
      const res = await request(app).post("/login").send({
        email: "user1@gmail.com",
        password: "zonk",
      });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "Email or password is wrong");
    });

    test("Email password requierd", async () => {
      const res = await request(app).post("/login").send({
        email: "",
        password: "",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Email is required");
    });
    test("Email password requierd", async () => {
      const res = await request(app).post("/register").send({
        email: "user1@gmail.com",
        password: "",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Password is required");
    });

    test("Product requierd", async () => {
      const res = await request(app).post("/products").send({
        email: "user1@gmail.com",
        password: "",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Password is required");
    });
  });
});
