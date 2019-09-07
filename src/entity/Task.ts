import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TaskStatus {
    PENDING = 0,
    COMPLETED = 10,
}

@Entity()
export default class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column()
    public username: string;

    @Column()
    public email: string;

    @Column()
    public text: string;

    @Column()
    public status: TaskStatus = TaskStatus.PENDING;
}
