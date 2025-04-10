import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "../src/data-source";
import { Project } from "../src/entities/Project";
import { User } from "../src/entities/User";

let token: string;

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
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Project Module", () => {
  let projectId: number;

  it("should create a new project", async () => {
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Project",
        description: "This is a test project",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test Project");
    projectId = response.body.id;
  });

  it("should get all projects", async () => {
    const response = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a project by ID", async () => {
    const response = await request(app)
      .get(`/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", projectId);
    expect(response.body.name).toBe("Test Project");
  });

  it("should update a project", async () => {
    const response = await request(app)
      .put(`/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Project",
        description: "Updated description",
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Project");
    expect(response.body.description).toBe("Updated description");
  });

  it("should delete a project", async () => {
    const response = await request(app)
      .delete(`/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it("should return 404 for a non-existent project", async () => {
    const response = await request(app)
      .get(`/projects/9999`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Project not found");
  });
});
