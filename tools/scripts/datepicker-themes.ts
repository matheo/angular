import { resolve } from 'path';
import { renderSync } from 'sass';

// TODO loop all prebuilt themes
renderSync({
  file: 'libs/datepicker/src/lib/prebuilt-themes/deeppurple-amber.scss',
  outFile: 'dist/libs/datepicker/prebuilt-themes/deeppurple-amber.css',
  outputStyle: 'compressed',
  importer: function (url, prev) {
    if (url[0] === '~') {
      url = resolve('node_modules', url.substr(1));
    }

    return { file: url };
  },
});
// node ./node_modules/.bin/sass libs/datepicker/src/lib/prebuilt-themes/:dist/libs/datepicker/prebuilt-themes/ --style compressed
