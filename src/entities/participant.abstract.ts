import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Participant {
    // Primary key column
    @PrimaryGeneratedColumn()
    public id!: number;

    // Name column
    @Column()
    public name!: string;

    // Entry date column
    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    public entryDate!: Date;
}
