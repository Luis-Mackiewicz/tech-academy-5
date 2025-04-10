// src/entities/Membership.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

export enum MembershipRole {
  LEADER = "LEADER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

@Entity()
@Unique(["userId", "projectId"])
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: MembershipRole,
    default: MembershipRole.MEMBER,
  })
  role: MembershipRole;

  @Column()
  userId: number;

  @Column()
  projectId: number;

  @ManyToOne(() => Project, (project) => project.memberships)
  project: Project;

  @ManyToOne(() => User, (user) => user.memberships)
  user: User;
}
