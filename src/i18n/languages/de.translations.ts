/* eslint-disable canonical/filename-match-exported */
const enTranslations = {
    replies: {
        commands: {
            configure: {
                weekly: {
                    day: {
                        noWeekDaySelected:
                            'Es wurde kein Tag ausgewählt. Versuchen Sie es später erneut.',
                        successful: 'Der weekly Tag wurde auf {{weekDay}} festgelegt.',
                        weekDaySelectorOpen:
                            'Wählen Sie einen Tag aus, der als weekly Tag verwendet werden soll. Alle Einträge für das nächste weekly werden gelöscht::',
                    },
                },
            },
            payout: {
                successful:
                    '50%: {{fiftyPercent}}€\n30%: {{thirtyPercent}}€\n20%: {{twentyPercent}}€\nRest: {{remaining}}€',
            },
            ping: {
                successful: 'Pong!',
            },
            seed: {
                successful_one: 'Seeded Gruppe: {{seededGroups}}',
                successful_other: 'Seeded Gruppen: {{seededGroups}}',
            },
            weekly: {
                bulkConfirm: {
                    bulkConfirmComponentShown:
                        'Sie können Benutzer auswählen oder einen Freestyle-Eintrag machen. Leider erlaubt Discord nicht beides in einem Modal.',
                    noParticipantsProvided: 'Es wurden keine Teilnehmer angegeben.',
                    noParticipantsSelected: 'Es wurden keine Teilnehmer ausgewählt.',
                    successful_one: 'Der weekly Teilnehmer: {{participants}} wurden bestätigt!',
                    successful_other: 'Die weekly Teilnehmer: {{participants}} wurden bestätigt!',
                },
                bulkDeconfirm: {
                    noParticipantsFound:
                        'Es gibt keine Teilnehmer, die dekonfirmiert werden können.',
                    noParticipantsSelected:
                        'Es wurden keine Teilnehmer ausgewählt. Versuchen Sie es später erneut.',
                    participantNotFound: 'Einige der Teilnehmer konnten nicht gefunden werden.',
                    participantsSelectorOpen:
                        'Wählen Sie Teilnehmer aus, um sie zu dekonfirmieren:',
                    successful_one: 'Der weekly Teilnehmer: {{participants}} wurden dekonfirmiert!',
                    successful_other:
                        'Die weekly Teilnehmer: {{participants}} wurden dekonfirmiert!',
                },
                confirm: {
                    alreadyConfirmed: 'Sie wurden bereits für dieses weekly bestätigt!',
                    successful: 'Sie wurden für dieses weekly bestätigt!',
                },
                deconfirm: {
                    participantNotFound: 'Sie haben Ihre Teilnahme an das weekly nicht bestätigt!',
                    successful: 'Sie wurden für das nächste weekly dekonfirmiert!',
                },
                history: {
                    noDatesSelected:
                        'Es wurden keine Daten ausgewählt. Versuchen Sie es später erneut.',
                    noPastWeeklies: 'Es gibt keine vergangenen weeklys.',
                    participantsHistoryDatesSelectorOpen:
                        'Wählen Sie Daten aus, um die Historie anzuzeigen:',
                    successful: 'Teilnahmehistorie: {{history}}',
                },
                participants: {
                    noParticipantsFound: 'Es gibt keine Teilnehmer für das nächste weekly.',
                    successful_one: '{{count}} Teilnehmer: {{participants}}',
                    successful_other: '{{count}} Teilnehmer: {{participants}}',
                },
            },
        },
        noGuildIdError:
            'Es konnte keine Server-ID gefunden werden. Befinden Sie sich auf einem Server?',
        noPermissionError: 'Sie haben keine Berechtigung, diesen Befehl zu verwenden.',
        unknownError:
            'Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    },
    ui: {
        configure: {
            weekly: {
                dayComponent: {
                    weekDaySelectorPlaceholder: 'Wählen Sie einen Wochentag aus',
                },
            },
        },
        seedModal: {
            seededListInputLabel: 'Seeded Liste',
            title: 'Seeded Liste angeben',
        },
        weekly: {
            bulkConfirmComponent: {
                freestyleButtonLabel: 'Freestyle',
                participantsSelectorPlaceholder: 'Teilnehmer auswählen',
            },
            bulkConfirmModal: {
                participantsBulkConfirmInputLabel: 'Teilnehmer',
                title: 'Um weekly Teilnehmer zu bestätigen',
            },
            bulkDeconfirmComponent: {
                participantsSelectorPlaceholder: 'Teilnehmer auswählen',
            },
            historyComponent: {
                participantsHistoryDatesSelectorPlaceholder: 'Daten auswählen',
            },
        },
    },
    values: {
        day: {
            friday: 'Freitag',
            monday: 'Montag',
            saturday: 'Samstag',
            sunday: 'Sonntag',
            thursday: 'Donnerstag',
            tuesday: 'Dienstag',
            wednesday: 'Mittwoch',
        },
    },
};

export default enTranslations;
