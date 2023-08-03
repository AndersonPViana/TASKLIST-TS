import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";

import { User } from "./User";

@Entity("tasks")
export class Task {
  
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ type: "text" })
  public name: string

  @Column({ type: "boolean" })
  public check: boolean

  @ManyToOne(() => User, (user) => user.tasks ) 
  public user: User

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  readonly created_at: Date

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  readonly updated_at: Date
}