import { Weekly } from '../entities/weekly.entity';
import { WeeklyParticipant } from '../entities/weekly-participant.entity';
import { Day } from '../shared/enums/day.enum';
import { ParticipantAlreadyConfirmedError } from '../shared/errors/business/participant-already-confirmed.error';
import { ParticipantNotFoundError } from '../shared/errors/business/participant-not-found.error';
// eslint-disable-next-line import/no-cycle
import { GuildConfigurationService } from './guild-configuration.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, MoreThan, Repository } from 'typeorm';

@Injectable()
export class WeeklyParticipantService {
    // Method to bulk confirm weekly participants
    public async bulkConfirmWeeklyParticipants(
        guildId: string,
        names: string[],
    ): Promise<WeeklyParticipant[]> {
        const weekly = await this.getOrCreateWeekly(guildId);

        // Get the existing participants
        const existingParticipants = await this.weeklyParticipantRepository.findBy({
            name: In(names),
            weekly,
        });

        const existingParticipantNames = existingParticipants.map(
            existingParticipant => existingParticipant.name,
        );

        // Create new participants for the names that are not already confirmed
        const newParticipants = names
            .filter(name => !existingParticipantNames.includes(name))
            .map(name => {
                const weeklyParticipant = new WeeklyParticipant();
                weeklyParticipant.name = name;
                weeklyParticipant.weekly = weekly;
                return weeklyParticipant;
            });

        return await this.weeklyParticipantRepository.save([...newParticipants]);
    }

    // Method to bulk deconfirm weekly participants
    public async bulkDeconfirmWeeklyParticipants(guildId: string, names: string[]): Promise<void> {
        const weeklyParticipants = await this.weeklyParticipantRepository.findBy({
            name: In(names),
            weekly: await this.getOrCreateWeekly(guildId),
        });

        // Check if participants were found
        if (weeklyParticipants.length !== names.length) {
            throw new ParticipantNotFoundError();
        }

        await this.weeklyParticipantRepository.remove(weeklyParticipants);
    }

    // Method to confirm a new weekly participant
    public async confirmNewWeeklyParticipant(
        guildId: string,
        name: string,
    ): Promise<WeeklyParticipant> {
        const weeklyParticipant = new WeeklyParticipant();
        weeklyParticipant.name = name;
        weeklyParticipant.weekly = await this.getOrCreateWeekly(guildId);

        // Check if the participant is already confirmed
        const existingParticipant = await this.weeklyParticipantRepository.findOneBy({
            name,
            weekly: weeklyParticipant.weekly,
        });

        // Throw an error if the participant is already confirmed
        if (existingParticipant) {
            throw new ParticipantAlreadyConfirmedError();
        }

        return await this.weeklyParticipantRepository.save(weeklyParticipant);
    }

    // Constructor that injects repositories and services
    public constructor(
        @InjectRepository(WeeklyParticipant)
        private readonly weeklyParticipantRepository: Repository<WeeklyParticipant>,
        @InjectRepository(Weekly)
        private readonly weeklyRepository: Repository<Weekly>,
        @Inject(forwardRef(() => GuildConfigurationService))
        private readonly guildConfigurationService: GuildConfigurationService,
    ) {}

    // Method to deconfirm a weekly participant
    public async deconfirmWeeklyParticipant(guildId: string, name: string): Promise<void> {
        const weeklyParticipant = await this.weeklyParticipantRepository.findOneBy({
            name,
            weekly: { guildId },
        });

        // Check if a participant was found
        if (!weeklyParticipant) {
            throw new ParticipantNotFoundError();
        }

        await this.weeklyParticipantRepository.remove(weeklyParticipant);
    }

    // Method to delete future weeklies
    public async deleteFutureWeeklies(guildId: string): Promise<void> {
        const futureWeeklies = await this.weeklyRepository.find({
            where: {
                date: MoreThan(new Date()),
                guildId,
            },
            relations: ['participants'],
        });

        // Delete all future weeklies. This will also delete all participants of the weeklies
        for (const weekly of futureWeeklies) {
            const participants = weekly.participants;

            if (participants.length > 0) {
                for (const participant of participants) {
                    await this.weeklyParticipantRepository.remove(participant);
                }
            }

            await this.weeklyRepository.remove(weekly);
        }
    }

    // Method to get all weekly participants by guild ID
    public async getAllWeeklyParticipantsByGuildId(guildId: string): Promise<WeeklyParticipant[]> {
        return await this.weeklyParticipantRepository.findBy({
            weekly: await this.getOrCreateWeekly(guildId),
        });
    }

    // Method to get or create a weekly entity
    private async getOrCreateWeekly(guildId: string): Promise<Weekly> {
        // Get the guild configuration
        const guildConfiguration =
            await this.guildConfigurationService.getGuildConfiguration(guildId);

        const weeklyDay = guildConfiguration.weeklyDay;
        const today = new Date();

        // Calculate the days until the next weekly day
        const daysUntilWeeklyDay =
            (Object.keys(Day).indexOf(weeklyDay.toUpperCase()) - today.getDay() + 7) % 7;
        const nextWeeklyDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + daysUntilWeeklyDay,
        );

        // Get the next weekly
        let weekly = await this.weeklyRepository.findOneBy({ guildId, date: nextWeeklyDate });

        // Create a new weekly if none was found
        if (!weekly) {
            weekly = new Weekly();
            weekly.guildId = guildId;
            weekly.date = nextWeeklyDate;
            await this.weeklyRepository.save(weekly);
        }

        return weekly;
    }

    // Method to get weekly dates
    public async getWeeklyDates(guildId: string, limit: number): Promise<Date[]> {
        const weeklies = await this.weeklyRepository.find({
            where: {
                guildId,
                date: LessThan(new Date()),
            },
            order: {
                date: 'DESC',
            },
            take: limit,
        });

        const weeklyDates = weeklies.map(weekly => weekly.date);

        return weeklyDates;
    }

    // Method to get weekly participant history
    public async getWeeklyParticipantHistory(
        guildId: string,
        dates: Date[],
    ): Promise<Array<{ date: Date; participants: WeeklyParticipant[] }>> {
        const weeklies = await this.weeklyRepository.find({
            where: {
                guildId,
                date: In(dates),
            },
            relations: ['participants'],
        });

        // Map the weeklies to the participant history
        const participantHistory = weeklies.map(weekly => {
            return {
                date: weekly.date,
                participants: weekly.participants,
            };
        });

        return participantHistory;
    }
}
