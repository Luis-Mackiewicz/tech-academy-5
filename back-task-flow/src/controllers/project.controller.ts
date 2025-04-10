import { Request, Response } from "express";
import { projectService } from "../services/project.service";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

export const getAllProjects = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errorMessage });
  }
};

export const getProjectById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(Number(id));
    res.status(200).json(project);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(404).json({ message: errorMessage });
  }
};

export const createProject = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const project = await projectService.createProject(
      name,
      description,
      userId
    );
    res.status(201).json(project);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errorMessage });
  }
};

export const updateProject = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const updatedProject = await projectService.updateProject(
      Number(id),
      name,
      description,
      userId
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errorMessage });
  }
};

export const deleteProject = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await projectService.deleteProject(Number(id), userId);
    res.status(204).send();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errorMessage });
  }
};
