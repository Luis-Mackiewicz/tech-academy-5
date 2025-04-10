import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "../src/data-source";
import { User } from "../src/entities/User";
import { Project } from "../src/entities/Project";

let token: string;
let projectId: number;
let taskId: number;

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

describe("Task Module", () => {
  it("should create a new task", async () => {
    const response = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        description: "This is a test task",
        status: "TODO",
        projectId,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test Task");
    taskId = response.body.id;
  });

  it("should get all tasks", async () => {
    const response = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a task by ID", async () => {
    const response = await request(app)
      .get(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", taskId);
    expect(response.body.title).toBe("Test Task");
  });

  it("should update a task", async () => {
    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Task",
        description: "Updated description",
        status: "IN_PROGRESS",
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Task");
    expect(response.body.description).toBe("Updated description");
    expect(response.body.status).toBe("IN_PROGRESS");
  });

  it("should delete a task", async () => {
    const response = await request(app)
      .delete(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it("should return 404 for a non-existent task", async () => {
    const response = await request(app)
      .get(`/tasks/9999`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Task not found");
  });
});
