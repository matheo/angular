import { readFileSync, writeFileSync } from 'fs';
import { echo, exit, test } from 'shelljs';

const [lib] = process.argv.slice(2);

if (!lib || !test('-f', `${lib}/package.json`)) {
  echo('post-build: invalid library path');
  exit(1);
}

const packageJson = `./dist/${lib}/package.json`;
const jsonFile = JSON.parse(readFileSync(packageJson, { encoding: 'utf8' }));

switch (jsonFile.name) {
  case '@matheo/datepicker':
    delete jsonFile['dependencies']['luxon'];
    writeFileSync(
      `dist/${lib}/package.json`,
      `${JSON.stringify(jsonFile, null, 2)}\n`
    );
    break;
}
