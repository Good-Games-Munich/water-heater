import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Participant {
    // Primary key column
    @PrimaryGeneratedColumn()
    public id!: number;

    // Name column
    @Column()
    public name!: string;

    // Entry date column
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public entryDate!: Date;
}
