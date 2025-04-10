import { Request, Response } from "express";
import { membershipService } from "../services/membership.service";
import { MembershipRole } from "../entities/Membership";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

const handleControllerError = (
  res: Response,
  error: unknown,
  statusCode = 400
) => {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  res.status(statusCode).json({ message: errorMessage });
};

export const getAllMemberships = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const memberships = await membershipService.getAllMemberships();
    res.status(200).json(memberships);
  } catch (error) {
    handleControllerError(res, error, 500);
  }
};

export const getMembershipById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid membership ID" });
      return;
    }

    const membership = await membershipService.getMembershipById(id);
    res.status(200).json(membership);
  } catch (error) {
    handleControllerError(res, error, 404);
  }
};

export const createMembership = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { userId, projectId, role } = req.body;

    if (!userId || !projectId || !role) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const membership = await membershipService.createMembership(
      userId,
      projectId,
      role as MembershipRole
    );
    res.status(201).json(membership);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const updateMembership = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid membership ID" });
      return;
    }

    const { role } = req.body;
    if (!role) {
      res.status(400).json({ message: "Role is required" });
      return;
    }

    const updatedMembership = await membershipService.updateMembership(
      id,
      role as MembershipRole
    );
    res.status(200).json(updatedMembership);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const deleteMembership = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid membership ID" });
      return;
    }

    await membershipService.deleteMembership(id);
    res.status(204).send();
  } catch (error) {
    handleControllerError(res, error);
  }
};
