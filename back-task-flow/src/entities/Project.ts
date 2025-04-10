// src/entities/Project.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Membership } from "./Membership";
import { Task } from "./Task";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  createdBy: number;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => Membership, (membership) => membership.project)
  memberships: Membership[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
