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
    @Column({ default: null, nullable: true, type: String })
    public debugChannelId!: null | string;

    // Weekly day column
    @Column({
        default: Day.THURSDAY,
        enum: Day,
        type: 'enum',
    })
    public weeklyDay!: Day;
}
