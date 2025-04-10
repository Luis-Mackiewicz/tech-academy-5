import { AppDataSource } from "../data-source";
import { Project } from "../entities/Project";
import { User } from "../entities/User";
import { Repository } from "typeorm";

class ProjectService {
  private projectRepository: Repository<Project>;
  private userRepository: Repository<User>;

  constructor() {
    this.projectRepository = AppDataSource.getRepository(Project);
    this.userRepository = AppDataSource.getRepository(User);
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ["creator", "memberships", "tasks"],
    });
  }

  async getProjectById(id: number): Promise<Project | null> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ["creator", "memberships", "tasks"],
    });

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  }

  async createProject(
    name: string,
    description: string,
    userId: number
  ): Promise<Project> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    const project = this.projectRepository.create({
      name,
      description,
      creator: user,
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

    if (project.creator.id !== userId) {
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

    if (project.creator.id !== userId) {
      throw new Error("You are not authorized to delete this project");
    }

    await this.projectRepository.remove(project);
  }
}

export const projectService = new ProjectService();
