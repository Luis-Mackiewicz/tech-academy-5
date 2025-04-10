import { Request, Response } from "express";
import { taskService } from "../services/task.service";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

export const getAllTasks = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errorMessage });
  }
};

export const getTaskById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(Number(id));
    res.status(200).json(task);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(404).json({ message: errorMessage });
  }
};

export const createTask = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, description, status, projectId } = req.body;

    const task = await taskService.createTask(
      title,
      description,
      status,
      projectId
    );
    res.status(201).json(task);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errorMessage });
  }
};

export const updateTask = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updatedTask = await taskService.updateTask(
      Number(id),
      title,
      description,
      status
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errorMessage });
  }
};

export const deleteTask = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await taskService.deleteTask(Number(id));
    res.status(204).send();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errorMessage });
  }
};
