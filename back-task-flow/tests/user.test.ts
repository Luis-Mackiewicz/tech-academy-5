import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "../src/data-source";
import { User } from "../src/entities/User";

let token: string;

async function clearDatabase() {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.query("SET FOREIGN_KEY_CHECKS = 0;");
  const entities = AppDataSource.entityMetadatas;
  for (const entity of entities) {
    await queryRunner.query(`TRUNCATE TABLE ${entity.tableName};`);
  }
  await queryRunner.query("SET FOREIGN_KEY_CHECKS = 1;");
  await queryRunner.release();
}

beforeAll(async () => {
  await AppDataSource.initialize();
  await clearDatabase();

  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create({
    name: "Ivan",
    email: "ivankov@gmail.com",
    password: "invankiv342",
    cpf: "12345678901",
  });
  await userRepository.save(user);

  const loginResponse = await request(app).post("/auth/login").send({
    email: "ivankov@gmail.com",
    password: "invankiv342",
  });

  token = loginResponse.body.token;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("User Routes", () => {
  it("should return a list of users", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "New User",
        email: "newuser@example.com",
        password: "password123",
        cpf: "98765432100",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe("newuser@example.com");
  });

  it("should not create a user with an existing email", async () => {
    const response = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Duplicate User",
        email: "testuser@example.com",
        password: "password123",
        cpf: "12345678901",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "E-mail já cadastrado");
  });

  it("should get a user by ID", async () => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
      email: "testuser@example.com",
    });

    const response = await request(app)
      .get(`/users/${user?.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", user?.id);
    expect(response.body.email).toBe("testuser@example.com");
  });

  it("should update a user", async () => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
      email: "testuser@example.com",
    });

    const response = await request(app)
      .put(`/users/${user?.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated User",
        email: "updateduser@example.com",
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated User");
    expect(response.body.email).toBe("updateduser@example.com");
  });

  it("should delete a user", async () => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
      email: "updateduser@example.com",
    });

    const response = await request(app)
      .delete(`/users/${user?.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
