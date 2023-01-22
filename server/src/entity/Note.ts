import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("varchar", { length: 20 })
    title!: string

    @Column("varchar", { length: 400 })
    content!: string;

    @Column("varchar")
    date!: string;

    // only hex colors (max 7 chars)
    @Column("varchar", { length: 7 })
    color!: string
};

export default Note;