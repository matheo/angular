module.exports = {
  name: 'datepicker',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/datepicker',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
