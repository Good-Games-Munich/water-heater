/* eslint-disable canonical/filename-match-exported */
const enTranslations = {
    replies: {
        commands: {
            ping: {
                successful: 'Pong!',
            },
            seed: {
                successful_one: 'Seeded Gruppe: {{seededGroups}}',
                successful_other: 'Seeded Gruppen: {{seededGroups}}',
            },
            weekly: {
                bulkConfirm: {
                    successful_one: 'Der weekly Teilnehmer: {{participants}} wurden bestätigt!',
                    successful_other: 'Die weekly Teilnehmer: {{participants}} wurden bestätigt!',
                    noParticipantsSelected: 'Es wurden keine Teilnehmer ausgewählt.',
                    noParticipantsProvided: 'Es wurden keine Teilnehmer angegeben.',
                    bulkConfirmComponentShown:
                        'Sie können Benutzer auswählen oder einen Freestyle-Eintrag machen. Leider erlaubt Discord nicht beides in einem Modal.',
                },
                bulkDeconfirm: {
                    noParticipantsFound:
                        'Es gibt keine Teilnehmer, die dekonfirmiert werden können.',
                    participantsSelectorOpen:
                        'Wählen Sie Teilnehmer aus, um sie zu dekonfirmieren:',
                    participantNotFound: 'Einige der Teilnehmer konnten nicht gefunden werden.',
                    noParticipantsSelected:
                        'Es wurden keine Teilnehmer ausgewählt. Versuchen Sie es später erneut.',
                    successful_one: 'Der weekly Teilnehmer: {{participants}} wurden dekonfirmiert!',
                    successful_other:
                        'Die weekly Teilnehmer: {{participants}} wurden dekonfirmiert!',
                },
                confirm: {
                    successful: 'Sie wurden für dieses weekly bestätigt!',
                    alreadyConfirmed: 'Sie wurden bereits für dieses weekly bestätigt!',
                },
                deconfirm: {
                    successful: 'Sie wurden für das nächste weekly dekonfirmiert!',
                    participantNotFound: 'Sie haben Ihre Teilnahme an das weekly nicht bestätigt!',
                },
                participants: {
                    noParticipantsFound: 'Es gibt keine Teilnehmer für das nächste weekly.',
                    successful_one: '{{count}} Teilnehmer: {{participants}}',
                    successful_other: '{{count}} Teilnehmer: {{participants}}',
                },
                history: {
                    noPastWeeklies: 'Es gibt keine vergangenen weeklys.',
                    noDatesSelected:
                        'Es wurden keine Daten ausgewählt. Versuchen Sie es später erneut.',
                    participantsHistoryDatesSelectorOpen:
                        'Wählen Sie Daten aus, um die Historie anzuzeigen:',
                    successful: 'Teilnahmehistorie: {{history}}',
                },
            },
            payout: {
                successful:
                    '50%: {{fiftyPercent}}€\n30%: {{thirtyPercent}}€\n20%: {{twentyPercent}}€\nRest: {{remaining}}€',
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
            bulkConfirmComponent: {
                participantsSelectorPlaceholder: 'Teilnehmer auswählen',
                freestyleButtonLabel: 'Freestyle',
            },
            bulkConfirmModal: {
                title: 'Um weekly Teilnehmer zu bestätigen',
                participantsBulkConfirmInputLabel: 'Teilnehmer',
            },
            bulkDeconfirmComponent: {
                participantsSelectorPlaceholder: 'Teilnehmer auswählen',
            },
            historyComponent: {
                participantsHistoryDatesSelectorPlaceholder: 'Daten auswählen',
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
};

export default enTranslations;
