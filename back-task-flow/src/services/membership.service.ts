import { AppDataSource } from "../data-source";
import { Membership, MembershipRole } from "../entities/Membership";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { Project } from "../entities/Project";

class MembershipService {
  private membershipRepository: Repository<Membership>;
  private userRepository: Repository<User>;
  private projectRepository: Repository<Project>;

  constructor() {
    this.membershipRepository = AppDataSource.getRepository(Membership);
    this.userRepository = AppDataSource.getRepository(User);
    this.projectRepository = AppDataSource.getRepository(Project);
  }

  async getAllMemberships(): Promise<Membership[]> {
    return await this.membershipRepository.find({
      relations: ["user", "project"],
    });
  }

  async getMembershipById(id: number): Promise<Membership> {
    const membership = await this.membershipRepository.findOne({
      where: { id },
      relations: ["user", "project"],
    });

    if (!membership) {
      throw new Error("Membership not found");
    }

    return membership;
  }

  async createMembership(
    userId: number,
    projectId: number,
    role: MembershipRole
  ): Promise<Membership> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new Error("Project not found");
    }

    const membership = this.membershipRepository.create({
      userId,
      projectId,
      role,
    });

    return await this.membershipRepository.save(membership);
  }

  async updateMembership(
    id: number,
    role: MembershipRole
  ): Promise<Membership> {
    const membership = await this.getMembershipById(id);

    membership.role = role;

    return await this.membershipRepository.save(membership);
  }

  async deleteMembership(id: number): Promise<void> {
    const membership = await this.getMembershipById(id);

    await this.membershipRepository.remove(membership);
  }
}

export const membershipService = new MembershipService();
