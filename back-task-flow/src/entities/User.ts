import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Membership } from "./Membership";
import { Project } from "./Project";
import { Task } from "./Task";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  cpf: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[];

  @OneToMany(() => Project, (project) => project.creator)
  projects: Project[];

  @OneToMany(() => Task, (task) => task.assignedTo)
  tasks: Task[];
}
