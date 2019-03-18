module.exports = {
  name: 'website',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/website/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
