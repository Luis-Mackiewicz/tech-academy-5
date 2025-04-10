import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "../src/data-source";
import jwt from "jsonwebtoken";

beforeAll(async () => {
  await AppDataSource.initialize();

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.query("SET FOREIGN_KEY_CHECKS = 0;");
  await queryRunner.query("TRUNCATE TABLE project;");
  await queryRunner.query("TRUNCATE TABLE user;");
  await queryRunner.query("SET FOREIGN_KEY_CHECKS = 1;");
  await queryRunner.release();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

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

  it("should not register a user with an existing email", async () => {
    const response = await request(app).post("/auth/register").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "E-mail já cadastrado");
  });

  it("should not register a user with an invalid email", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ ...userData, email: "invalid-email" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "E-mail inválido");
  });

  it("should not register a user with a weak password", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ ...userData, password: "123" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Senha fraca");
  });

  it("should not register a user with an invalid CPF", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ ...userData, cpf: "123" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "CPF inválido");
  });

  it("should login with valid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");

    const decoded = jwt.verify(
      response.body.token,
      process.env.JWT_SECRET || "secret"
    ) as jwt.JwtPayload;

    expect(decoded).toHaveProperty("userId");
  });

  it("should not login with invalid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: userData.email,
      password: "WrongPassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Credenciais inválidas");
  });

  it("should not access a protected route without a token", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Token não fornecido");
  });

  it("should not access a protected route with an invalid token", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", "Bearer invalidtoken");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Token inválido");
  });
});
