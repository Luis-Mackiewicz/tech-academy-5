import request from "supertest";
import app from "../src/app";

describe("Auth Routes", () => {
  const userData = {
    name: "IrineuBebeu",
    email: "teste@email.com",
    password: "H1z1nf0r3v3r",
    cpf: "123.456.789-09",
  };

  it("should register a new user", async () => {
    const response = await request(app).post("/auth/register").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email", userData.email);
  });

  it("should not register a user with invalid data", async () => {
    const invalidData = [
      { ...userData, email: "invalid-email" },
      { ...userData, password: "123" },
      { ...userData, cpf: "123" },
    ];

    for (const data of invalidData) {
      const response = await request(app).post("/auth/register").send(data);
      expect(response.status).toBe(400);
    }
  });

  it("should login with valid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    const token = response.body.token;
    expect(token.split(".").length).toBe(3);
  });

  it("should not login with invalid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: userData.email,
      password: "WrongPassword",
    });

    expect(response.status).toBe(401);
  });

  it("should not access a protected route without a valid token", async () => {
    const invalidTokens = [null, "invalidtoken", "malformed-token"];

    for (const token of invalidTokens) {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
    }
  });

  it("should not access a protected route with a malformed token", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", "Bearer malformed-token");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Token inválido");
  });
});
