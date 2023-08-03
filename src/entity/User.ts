import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

import { Task } from "./Task";

@Entity("users")
export class User {

  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ type: "text" })
  public name: string

  @Column({ type: "text", unique: true })
  public email: string

  @Column({ type: "text" })
  public password_hash: string

  @OneToMany(() => Task, (task) => task.user )
  public tasks: Task[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  readonly created_at: Date

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  readonly updated_at: Date
}