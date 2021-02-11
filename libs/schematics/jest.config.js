module.exports = {
  displayName: 'schematics',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/schematics',
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
};
