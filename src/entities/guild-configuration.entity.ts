import { Day } from '../shared/enums/day.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GuildConfiguration {
    // Primary key column
    @PrimaryGeneratedColumn()
    public id!: number;

    // Guild ID column
    @Column()
    public guildId!: string;

    // Debug channel ID column
    @Column({ type: String, default: null, nullable: true })
    public debugChannelId!: string | null;

    // Weekly day column
    @Column({
        type: 'enum',
        enum: Day,
        default: Day.THURSDAY,
    })
    public weeklyDay!: Day;
}
