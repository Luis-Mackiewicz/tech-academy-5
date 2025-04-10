import { Request, Response } from "express";
import { membershipService } from "../services/membership.service";
import { MembershipRole } from "../entities/Membership";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

export const getAllMemberships = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const memberships = await membershipService.getAllMemberships();
    res.status(200).json(memberships);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errorMessage });
  }
};

export const getMembershipById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const membership = await membershipService.getMembershipById(Number(id));
    res.status(200).json(membership);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(404).json({ message: errorMessage });
  }
};

export const createMembership = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { userId, projectId, role } = req.body;

    const membership = await membershipService.createMembership(
      userId,
      projectId,
      role as MembershipRole
    );
    res.status(201).json(membership);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errorMessage });
  }
};

export const updateMembership = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updatedMembership = await membershipService.updateMembership(
      Number(id),
      role as MembershipRole
    );
    res.status(200).json(updatedMembership);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errorMessage });
  }
};

export const deleteMembership = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await membershipService.deleteMembership(Number(id));
    res.status(204).send();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errorMessage });
  }
};
