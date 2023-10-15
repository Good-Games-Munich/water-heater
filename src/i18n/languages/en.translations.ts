/* eslint-disable canonical/filename-match-exported */
const enTranslations = {
    replies: {
        commands: {
            ping: {
                successful: 'Pong!',
            },
            seed: {
                successful_one: 'Seeded Group: {{seededGroups}}',
                successful_other: 'Seeded Groups: {{seededGroups}}',
            },
            weekly: {
                bulkConfirm: {
                    successful_one: 'The weekly participant: {{participants}} has been confirmed!',
                    successful_other:
                        'The weekly participants: {{participants}} have been confirmed!',
                },
                bulkDeconfirm: {
                    noParticipantsFound: 'There are no participants to deconfirm.',
                    participantsSelectorOpen: 'Select participants to deconfirm:',
                    participantNotFound: 'Some of the participants could not be found.',
                    noParticipantsSelected: 'No participants were selected. Try again later.',
                    successful_one:
                        'The weekly participant: {{participants}} has been deconfirmed!',
                    successful_other:
                        'The weekly participants: {{participants}} have been deconfirmed!',
                },
                confirm: {
                    successful: 'You have been confirmed for the next weekly!',
                    alreadyConfirmed: 'You have already been confirmed for the next weekly!',
                },
                deconfirm: {
                    successful: 'You have been deconfirmed for the next weekly!',
                    participantNotFound:
                        'You have not confirmed your participation in the next weekly!',
                },
                participants: {
                    noParticipantsFound: 'There are no participants for the next weekly.',
                    successful_one: '{{count}} Participant: {{participants}}',
                    successful_other: '{{count}} Participants: {{participants}}',
                },
                history: {
                    noPastWeeklies: 'There are no past weeklies.',
                    noDatesSelected: 'No dates have been selected. Try again later.',
                    participantsHistoryDatesSelectorOpen: 'Select dates to view the history:',
                    successful: 'Participation history: {{history}}',
                },
            },
            payout: {
                successful:
                    '50%: {{fiftyPercent}}\n30%: {{thirtyPercent}}\n20%: {{twentyPercent}}\nRemaining: {{remaining}}',
            },
            configure: {
                weekly: {
                    day: {
                        weekDaySelectorOpen:
                            'Select a day to be used as the weekly day. All entries for the current future weekly will be removed:',
                        noWeekDaySelected: 'No day has been selected. Try again later.',
                        successful: 'The weekly day has been set to {{weekDay}}.',
                    },
                },
            },
        },
        unknownError: 'An unknown error has occurred. Please try again later.',
        noGuildIdError: 'No guild id could be found. Are you on a server?',
        noPermissionError: 'You do not have permission to use this command.',
    },
    ui: {
        seedModal: {
            title: 'Specify seeded list',
            seededListInputLabel: 'Seeded list',
        },
        weekly: {
            bulkConfirmModal: {
                title: 'To confirm weekly participants',
                participantsBulkConfirmInputLabel: 'Participants',
            },
            bulkDeconfirmComponent: {
                participantsSelectorPlaceholder: 'Select participants',
            },
            historyComponent: {
                participantsHistoryDatesSelectorPlaceholder: 'Select dates',
            },
        },
        configure: {
            weekly: {
                dayComponent: {
                    weekDaySelectorPlaceholder: 'Select a week day',
                },
            },
        },
    },
    values: {
        day: {
            monday: 'Monday',
            tuesday: 'Tuesday',
            wednesday: 'Wednesday',
            thursday: 'Thursday',
            friday: 'Friday',
            saturday: 'Saturday',
            sunday: 'Sunday',
        },
    },
};

export default enTranslations;
