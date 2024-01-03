import type { CommandInteraction } from 'discord.js';

export const getNicknameOrDisplayName = (interaction: CommandInteraction) => {
    // Check if the interaction has a member and a nickname
    if (interaction.member && 'nickname' in interaction.member && interaction.member.nickname) {
        return interaction.member.nickname;
    }

    return interaction.user.displayName;
};
