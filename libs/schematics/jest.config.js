module.exports = {
  name: 'schematics',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/schematics',
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
};
