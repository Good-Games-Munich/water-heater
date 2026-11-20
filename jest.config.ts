/* eslint-disable canonical/filename-match-exported */
import { type Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['src/**/*.ts'],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
        },
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    testEnvironment: 'node',
    testRegex: '\\.(component-)?test\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
};

export default config;
