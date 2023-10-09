import { Weekly } from '../entities/weekly.entity';
import { WeeklyParticipant } from '../entities/weekly-participant.entity';
import { Day } from '../shared/enums/day.enum';
import { ParticipantAlreadyConfirmedError } from '../shared/errors/business/participant-already-confirmed.error';
import { ParticipantNotFoundError } from '../shared/errors/business/participant-not-found.error';
// eslint-disable-next-line import/no-cycle
import { GuildConfigurationService } from './guild-configuration.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThan, Repository } from 'typeorm';

@Injectable()
export class WeeklyParticipantService {
    public async bulkConfirmWeeklyParticipants(
        guildId: string,
        names: string[],
    ): Promise<WeeklyParticipant[]> {
        const weekly = await this.getOrCreateWeekly(guildId);

        const existingParticipants = await this.weeklyParticipantRepository.findBy({
            name: In(names),
            guildId,
            weekly,
        });

        const existingParticipantNames = existingParticipants.map(
            existingParticipant => existingParticipant.name,
        );

        const newParticipants = names
            .filter(name => !existingParticipantNames.includes(name))
            .map(name => {
                const weeklyParticipant = new WeeklyParticipant();
                weeklyParticipant.name = name;
                weeklyParticipant.guildId = guildId;
                weeklyParticipant.weekly = weekly;
                return weeklyParticipant;
            });

        return await this.weeklyParticipantRepository.save([...newParticipants]);
    }

    public async bulkDeconfirmWeeklyParticipants(guildId: string, names: string[]): Promise<void> {
        const weeklyParticipants = await this.weeklyParticipantRepository.findBy({
            name: In(names),
            guildId,
            weekly: await this.getOrCreateWeekly(guildId),
        });

        if (weeklyParticipants.length !== names.length) {
            throw new ParticipantNotFoundError();
        }

        await this.weeklyParticipantRepository.remove(weeklyParticipants);
    }

    public async confirmNewWeeklyParticipant(
        guildId: string,
        name: string,
    ): Promise<WeeklyParticipant> {
        const weeklyParticipant = new WeeklyParticipant();
        weeklyParticipant.name = name;
        weeklyParticipant.guildId = guildId;
        weeklyParticipant.weekly = await this.getOrCreateWeekly(guildId);

        const existingParticipant = await this.weeklyParticipantRepository.findOneBy({
            name,
            guildId,
            weekly: weeklyParticipant.weekly,
        });

        if (existingParticipant) {
            throw new ParticipantAlreadyConfirmedError();
        }

        return await this.weeklyParticipantRepository.save(weeklyParticipant);
    }

    public constructor(
        @InjectRepository(WeeklyParticipant)
        private readonly weeklyParticipantRepository: Repository<WeeklyParticipant>,
        @InjectRepository(Weekly)
        private readonly weeklyRepository: Repository<Weekly>,
        @Inject(forwardRef(() => GuildConfigurationService))
        private readonly guildConfigurationService: GuildConfigurationService,
    ) {}

    public async deconfirmWeeklyParticipant(guildId: string, name: string): Promise<void> {
        const weeklyParticipant = await this.weeklyParticipantRepository.findOneBy({
            name,
            guildId,
        });

        if (!weeklyParticipant) {
            throw new ParticipantNotFoundError();
        }

        await this.weeklyParticipantRepository.remove(weeklyParticipant);
    }

    public async deleteFutureWeeklies(guildId: string): Promise<void> {
        const futureWeeklies = await this.weeklyRepository.find({
            where: {
                date: MoreThan(new Date()),
            },
            relations: ['participants'],
        });

        for (const weekly of futureWeeklies) {
            const participants = weekly.participants.filter(
                participant => participant.guildId === guildId,
            );

            if (participants.length > 0) {
                for (const participant of participants) {
                    await this.weeklyParticipantRepository.remove(participant);
                }
            }

            await this.weeklyRepository.remove(weekly);
        }
    }

    public async getAllWeeklyParticipantsByGuildId(guildId: string): Promise<WeeklyParticipant[]> {
        return await this.weeklyParticipantRepository.findBy({
            guildId,
            weekly: await this.getOrCreateWeekly(guildId),
        });
    }

    private async getOrCreateWeekly(guildId: string): Promise<Weekly> {
        const guildConfiguration =
            await this.guildConfigurationService.getGuildConfiguration(guildId);

        const weeklyDay = guildConfiguration.weeklyDay;
        const today = new Date();
        const daysUntilWeeklyDay =
            (Object.keys(Day).indexOf(weeklyDay.toUpperCase()) - today.getDay() + 7) % 7;
        const nextWeeklyDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + daysUntilWeeklyDay,
        );

        let weekly = await this.weeklyRepository.findOneBy({ date: nextWeeklyDate });
        if (!weekly) {
            weekly = new Weekly();
            weekly.date = nextWeeklyDate;
            await this.weeklyRepository.save(weekly);
        }

        return weekly;
    }
}
