import { echo, exec, exit, test, which } from 'shelljs';

const [lib] = process.argv.slice(2);

if (!lib || !test('-f', `${lib}/package.json`)) {
  echo('git-tag: invalid library path');
  exit(1);
}

if (!which('git')) {
  echo('git-tag: git is required');
  exit(1);
}

const { name, version } = require(`../../${lib}/package.json`);

exec(`git tag -a ${name}@${version} -m "${name} v${version}" master`);
exec(`git push --tags`);
