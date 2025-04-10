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

describe("User Routes", () => {
  it("should return an empty list of users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
