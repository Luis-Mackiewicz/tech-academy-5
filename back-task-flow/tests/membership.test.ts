import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "../src/data-source";
import { User } from "../src/entities/User";
import { Project } from "../src/entities/Project";

let token: string;
let projectId: number;
let membershipId: number;

beforeAll(async () => {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create({
    name: "Test User",
    email: "testuser@example.com",
    password: "password123",
    cpf: "12345678901",
  });
  await userRepository.save(user);

  const response = await request(app).post("/auth/login").send({
    email: "testuser@example.com",
    password: "password123",
  });
  token = response.body.token;

  const projectResponse = await request(app)
    .post("/projects")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test Project",
      description: "This is a test project",
    });
  projectId = projectResponse.body.id;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Membership Module", () => {
  it("should create a new membership", async () => {
    const response = await request(app)
      .post("/memberships")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: 1,
        projectId,
        role: "MEMBER",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.role).toBe("MEMBER");
    membershipId = response.body.id;
  });

  it("should get all memberships", async () => {
    const response = await request(app)
      .get("/memberships")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a membership by ID", async () => {
    const response = await request(app)
      .get(`/memberships/${membershipId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", membershipId);
  });

  it("should update a membership", async () => {
    const response = await request(app)
      .put(`/memberships/${membershipId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        role: "ADMIN",
      });

    expect(response.status).toBe(200);
    expect(response.body.role).toBe("ADMIN");
  });

  it("should delete a membership", async () => {
    const response = await request(app)
      .delete(`/memberships/${membershipId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it("should return 404 for a non-existent membership", async () => {
    const response = await request(app)
      .get(`/memberships/9999`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Membership not found");
  });
});
