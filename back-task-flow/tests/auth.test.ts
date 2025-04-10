import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "../src/data-source";
import { User } from "../src/entities/User";

beforeAll(async () => {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  await userRepository.clear();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Auth Routes", () => {
  const userData = {
    name: "Ivan",
    email: "ivan@gmail.com",
    password: "Minhasenha123@",
    cpf: "123.456.789-00",
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

  it("should login with valid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should not login with invalid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: userData.email,
      password: "WrongPassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Credenciais inválidas");
  });
});
