import { resolve } from 'path';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const jestConfig: import('@jest/types').Config.InitialOptions = {
  rootDir: resolve(__dirname),
  clearMocks: true,
  coverageProvider: 'v8',
  bail: true,
  displayName: 'unit-tests',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  preset: 'ts-jest',
};

export default jestConfig;
