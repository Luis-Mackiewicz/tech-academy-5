import request from "supertest";
import app from "../src/app";
import prisma from "../src/prisma/client";

beforeAll(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("User Routes", () => {
  it("should return an empty list of users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
