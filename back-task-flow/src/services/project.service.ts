import { AppDataSource } from "../data-source";
import { Project } from "../entities/Project";
import { Repository } from "typeorm";

class ProjectService {
  private projectRepository: Repository<Project>;

  constructor() {
    this.projectRepository = AppDataSource.getRepository(Project);
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ["user", "memberships", "tasks"],
    });
  }

  async getProjectById(id: number): Promise<Project | null> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ["user", "memberships", "tasks"],
    });

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  }

  async createProject(
    name: string,
    description: string,
    createdBy: number
  ): Promise<Project> {
    const project = this.projectRepository.create({
      name,
      description,
      createdBy,
    });

    return await this.projectRepository.save(project);
  }

  async updateProject(
    id: number,
    name: string,
    description: string,
    userId: number
  ): Promise<Project> {
    const project = await this.getProjectById(id);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.createdBy !== userId) {
      throw new Error("You are not authorized to update this project");
    }

    project.name = name;
    project.description = description;

    return await this.projectRepository.save(project);
  }

  async deleteProject(id: number, userId: number): Promise<void> {
    const project = await this.getProjectById(id);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.createdBy !== userId) {
      throw new Error("You are not authorized to delete this project");
    }

    await this.projectRepository.remove(project);
  }
}

export const projectService = new ProjectService();
