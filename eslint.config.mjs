// @ts-check

import { auto, jestTs } from '@beuluis/eslint-config';
import { config } from 'typescript-eslint';

export default config(
    auto,
    {
        extends: jestTs,
        files: [
            '**/*.?(component-){spec,test}.{ts,tsx}',
            '**/{__mocks__,__tests__}/**/*.{ts,tsx}',
            '**/jest.setup.{ts}',
        ],
    },
    {
        files: ['**/entities/**'],
        rules: {
            'perfectionist/sort-classes': 'off',
        },
    },
    {
        rules: {
            'import/extensions': 'off',
        },
    },
    {
        ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'],
    },
);
