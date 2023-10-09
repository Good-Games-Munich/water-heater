// eslint-disable-next-line import/no-cycle
import { WeeklyParticipant } from './weekly-participant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Weekly {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'timestamp' })
    public date!: Date;

    @OneToMany(() => WeeklyParticipant, weeklyParticipant => weeklyParticipant.weekly, {
        onDelete: 'CASCADE',
    })
    public participants!: WeeklyParticipant[];
}
