/* eslint-disable canonical/filename-match-exported */
const enTranslations = {
    replies: {
        commands: {
            configure: {
                weekly: {
                    day: {
                        noWeekDaySelected: 'No day has been selected. Try again later.',
                        successful: 'The weekly day has been set to {{weekDay}}.',
                        weekDaySelectorOpen:
                            'Select a day to be used as the weekly day. All entries for the current future weekly will be removed:',
                    },
                },
            },
            payout: {
                successful:
                    '50%: {{fiftyPercent}}€\n30%: {{thirtyPercent}}€\n20%: {{twentyPercent}}€\nRemaining: {{remaining}}€',
            },
            ping: {
                successful: 'Pong!',
            },
            seed: {
                successful_one: 'Seeded Group: {{seededGroups}}',
                successful_other: 'Seeded Groups: {{seededGroups}}',
            },
            weekly: {
                bulkConfirm: {
                    bulkConfirmComponentShown:
                        'You can select users or make a freestyle entry. Sadly discord does not allow to do both in a modal.',
                    noParticipantsProvided: 'No participants were provided.',
                    noParticipantsSelected: 'No participants were selected.',
                    successful_one: 'The weekly participant: {{participants}} has been confirmed!',
                    successful_other:
                        'The weekly participants: {{participants}} have been confirmed!',
                },
                bulkDeconfirm: {
                    noParticipantsFound: 'There are no participants to deconfirm.',
                    noParticipantsSelected: 'No participants were selected. Try again later.',
                    participantNotFound: 'Some of the participants could not be found.',
                    participantsSelectorOpen: 'Select participants to deconfirm:',
                    successful_one:
                        'The weekly participant: {{participants}} has been deconfirmed!',
                    successful_other:
                        'The weekly participants: {{participants}} have been deconfirmed!',
                },
                confirm: {
                    alreadyConfirmed: 'You have already been confirmed for the next weekly!',
                    successful: 'You have been confirmed for the next weekly!',
                },
                deconfirm: {
                    participantNotFound:
                        'You have not confirmed your participation in the next weekly!',
                    successful: 'You have been deconfirmed for the next weekly!',
                },
                history: {
                    noDatesSelected: 'No dates have been selected. Try again later.',
                    noPastWeeklies: 'There are no past weeklies.',
                    participantsHistoryDatesSelectorOpen: 'Select dates to view the history:',
                    successful: 'Participation history: {{history}}',
                },
                participants: {
                    noParticipantsFound: 'There are no participants for the next weekly.',
                    successful_one: '{{count}} Participant: {{participants}}',
                    successful_other: '{{count}} Participants: {{participants}}',
                },
            },
        },
        noGuildIdError: 'No guild id could be found. Are you on a server?',
        noPermissionError: 'You do not have permission to use this command.',
        unknownError: 'An unknown error has occurred. Please try again later.',
    },
    ui: {
        configure: {
            weekly: {
                dayComponent: {
                    weekDaySelectorPlaceholder: 'Select a week day',
                },
            },
        },
        seedModal: {
            seededListInputLabel: 'Seeded list',
            title: 'Specify seeded list',
        },
        weekly: {
            bulkConfirmComponent: {
                freestyleButtonLabel: 'Freestyle',
                participantsSelectorPlaceholder: 'Select participants',
            },
            bulkConfirmModal: {
                participantsBulkConfirmInputLabel: 'Participants',
                title: 'To confirm weekly participants',
            },
            bulkDeconfirmComponent: {
                participantsSelectorPlaceholder: 'Select participants',
            },
            historyComponent: {
                participantsHistoryDatesSelectorPlaceholder: 'Select dates',
            },
        },
    },
    values: {
        day: {
            friday: 'Friday',
            monday: 'Monday',
            saturday: 'Saturday',
            sunday: 'Sunday',
            thursday: 'Thursday',
            tuesday: 'Tuesday',
            wednesday: 'Wednesday',
        },
    },
};

export default enTranslations;
