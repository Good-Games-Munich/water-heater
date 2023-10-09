/* eslint-disable canonical/filename-match-exported */
const messagesTranslations = {
    en: {
        replies: {
            commands: {
                ping: {
                    successful: 'Pong!',
                },
                seed: {
                    successful: 'Seeded Groups: {{seededGroups}}',
                },
                weekly: {
                    bulkConfirm: {
                        successful:
                            'The weekly participants: {{participants}} have been confirmed!',
                    },
                    bulkDeconfirm: {
                        noParticipantsFound: 'There are no participants to deconfirm.',
                        participantsSelectorOpen: 'Select participants to deconfirm:',
                        participantNotFound: 'Some of the participants could not be found.',
                        noParticipantsSelected: 'No participants were selected. Try again later.',
                        successful:
                            'The weekly participants: {{participants}} have been deconfirmed!',
                    },
                    confirm: {
                        successful: 'You have been confirmed for this week!',
                        alreadyConfirmed: 'You have already been confirmed for this week!',
                    },
                    deconfirm: {
                        successful: 'You have been deconfirmed for the next weekly!',
                        participantNotFound:
                            'You have not confirmed your participation in the next weekly!',
                    },
                    participants: {
                        noParticipantsFound: 'There are no participants for the next weekly.',
                        successful: 'Participants: {{participants}}',
                    },
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
    },
    de: {
        replies: {
            commands: {
                ping: {
                    successful: 'Pong!',
                },
                seed: {
                    successful: 'Gruppen seeded: {{seededGroups}}',
                },
                weekly: {
                    bulkConfirm: {
                        successful: 'Die weekly Teilnehmer: {{participants}} wurden bestätigt!',
                    },
                    bulkDeconfirm: {
                        noParticipantsFound:
                            'Es gibt keine Teilnehmer, die dekonfirmiert werden können.',
                        participantsSelectorOpen:
                            'Wählen Sie Teilnehmer aus, um sie zu dekonfirmieren:',
                        participantNotFound: 'Einige der Teilnehmer konnten nicht gefunden werden.',
                        noParticipantsSelected:
                            'Es wurden keine Teilnehmer ausgewählt. Versuchen Sie es später erneut.',
                        successful: 'Die weekly Teilnehmer: {{participants}} wurden dekonfirmiert!',
                    },
                    confirm: {
                        successful: 'Sie wurden für dieses weekly bestätigt!',
                        alreadyConfirmed: 'Sie wurden bereits für dieses weekly bestätigt!',
                    },
                    deconfirm: {
                        successful: 'Sie wurden für das nächste weekly dekonfirmiert!',
                        participantNotFound:
                            'Sie haben Ihre Teilnahme an das weekly nicht bestätigt!',
                    },
                    participants: {
                        noParticipantsFound: 'Es gibt keine Teilnehmer für das nächste weekly.',
                        successful: 'Teilnehmer: {{participants}}',
                    },
                },
                configure: {
                    weekly: {
                        day: {
                            weekDaySelectorOpen:
                                'Wählen Sie einen Tag aus, der als weekly Tag verwendet werden soll. Alle Einträge für das nächste weekly werden gelöscht::',
                            noWeekDaySelected:
                                'Es wurde kein Tag ausgewählt. Versuchen Sie es später erneut.',
                            successful: 'Der weekly Tag wurde auf {{weekDay}} festgelegt.',
                        },
                    },
                },
            },
            unknownError:
                'Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
            noGuildIdError:
                'Es konnte keine Server-ID gefunden werden. Befinden Sie sich auf einem Server?',
            noPermissionError: 'Sie haben keine Berechtigung, diesen Befehl zu verwenden.',
        },
        ui: {
            seedModal: {
                title: 'Seeded Liste angeben',
                seededListInputLabel: 'Seeded Liste',
            },
            weekly: {
                bulkConfirmModal: {
                    title: 'Um weekly Teilnehmer zu bestätigen',
                    participantsBulkConfirmInputLabel: 'Teilnehmer',
                },
                bulkDeconfirmComponent: {
                    participantsSelectorPlaceholder: 'Teilnehmer auswählen',
                },
            },
            configure: {
                weekly: {
                    dayComponent: {
                        weekDaySelectorPlaceholder: 'Wählen Sie einen Wochentag aus',
                    },
                },
            },
        },
        values: {
            day: {
                monday: 'Montag',
                tuesday: 'Dienstag',
                wednesday: 'Mittwoch',
                thursday: 'Donnerstag',
                friday: 'Freitag',
                saturday: 'Samstag',
                sunday: 'Sonntag',
            },
        },
    },
};

export default messagesTranslations;
