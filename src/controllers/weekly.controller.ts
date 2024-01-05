import { BaseController } from '../decorators/base-controller.decorator';
import type { WeeklyParticipant } from '../entities/weekly-participant.entity';
import { WeeklyParticipantService } from '../services/weekly-participant.service';
import { WeeklyNotFoundError } from '../shared/errors/business/weekly-not-found.error';
import { Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@BaseController('weekly', 'Weekly')
export class WeeklyController {
    public constructor(private readonly weeklyParticipantService: WeeklyParticipantService) {}

    @Get('participants/:guildId')
    @ApiOkResponse({
        description: 'Returns all participants of the weekly for the given guild.',
        type: String,
        isArray: true,
    })
    public async getAllParticipants(@Param('guildId') guildId: string): Promise<string[]> {
        let weeklyParticipants: WeeklyParticipant[];
        try {
            weeklyParticipants =
                await this.weeklyParticipantService.getAllWeeklyParticipantsByGuildId(guildId);
        } catch (error) {
            if (error instanceof WeeklyNotFoundError) {
                weeklyParticipants = [];
            } else {
                throw error;
            }
        }

        return weeklyParticipants.map(weeklyParticipant => weeklyParticipant.name);
    }
}
