// eslint-disable-next-line import/no-cycle
import { WeeklyParticipant } from './weekly-participant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Weekly {
    // Primary key column
    @PrimaryGeneratedColumn()
    public id!: number;

    // Guild ID column
    @Column()
    public guildId!: string;

    // Date column
    @Column({ type: 'timestamp' })
    public date!: Date;

    // One-to-many relationship with WeeklyParticipant entity
    @OneToMany(() => WeeklyParticipant, weeklyParticipant => weeklyParticipant.weekly, {
        onDelete: 'CASCADE',
    })
    public participants!: WeeklyParticipant[];
}
