import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Participant {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public entryDate!: Date;
}
