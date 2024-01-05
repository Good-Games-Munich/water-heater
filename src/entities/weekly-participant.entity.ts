import { Participant } from './participant.abstract';
// eslint-disable-next-line import/no-cycle
import { Weekly } from './weekly.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class WeeklyParticipant extends Participant {
    // Many-to-one relationship with Weekly entity
    @ManyToOne(() => Weekly)
    public weekly!: Weekly;
}
