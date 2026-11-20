/* eslint-disable perfectionist/sort-enums -- order must match Date#getDay() (Sunday first), see Object.keys(Day).indexOf usage */
// Define an enum called Day with string values for each day of the week
export enum Day {
    SUNDAY = 'sunday',
    MONDAY = 'monday',
    TUESDAY = 'tuesday',
    WEDNESDAY = 'wednesday',
    THURSDAY = 'thursday',
    FRIDAY = 'friday',
    SATURDAY = 'saturday',
}
