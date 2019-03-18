module.exports = {
  name: 'datasource',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/datasource',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
