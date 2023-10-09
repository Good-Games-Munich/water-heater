import { Day } from '../shared/enums/day.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GuildConfiguration {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public guildId!: string;

    @Column({ type: String, default: null, nullable: true })
    public debugChannelId!: string | null;

    @Column({
        type: 'enum',
        enum: Day,
        default: Day.THURSDAY,
    })
    public weeklyDay!: Day;
}
