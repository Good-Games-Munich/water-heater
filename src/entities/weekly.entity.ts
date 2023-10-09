// eslint-disable-next-line import/no-cycle
import { WeeklyParticipant } from './weekly-participant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// TODO: Write bot invite guid and configure help command to get the link
export class Weekly {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public guildId!: string;

    @Column({ type: 'timestamp' })
    public date!: Date;

    @OneToMany(() => WeeklyParticipant, weeklyParticipant => weeklyParticipant.weekly, {
        onDelete: 'CASCADE',
    })
    public participants!: WeeklyParticipant[];
}
