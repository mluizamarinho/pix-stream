export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^../lib/prisma$': '<rootDir>/__mocks__/lib/prisma.ts'
  },
  testMatch: ['**/tests/**/*.test.ts'],
};
