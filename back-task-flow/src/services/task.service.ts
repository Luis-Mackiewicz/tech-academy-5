import { AppDataSource } from "../data-source";
import { Task, TaskStatus } from "../entities/Task";
import { Repository } from "typeorm";
import { Project } from "../entities/Project";

class TaskService {
  private taskRepository: Repository<Task>;
  private projectRepository: Repository<Project>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);
    this.projectRepository = AppDataSource.getRepository(Project);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ["project"],
    });
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ["project"],
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  async createTask(
    title: string,
    description: string,
    status: TaskStatus,
    projectId: number
  ): Promise<Task> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const task = this.taskRepository.create({
      title,
      description,
      status,
      project,
    });

    return await this.taskRepository.save(task);
  }

  async updateTask(
    id: number,
    title: string,
    description: string,
    status: TaskStatus
  ): Promise<Task> {
    const task = await this.getTaskById(id);

    task.title = title;
    task.description = description;
    task.status = status;

    return await this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.getTaskById(id);

    await this.taskRepository.remove(task);
  }
}

export const taskService = new TaskService();
