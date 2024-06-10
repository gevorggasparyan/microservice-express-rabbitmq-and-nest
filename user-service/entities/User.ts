import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'User'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    gender: string;

    @Column()
    problem: boolean;
}