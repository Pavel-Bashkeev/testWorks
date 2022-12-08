import { configFtp } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

export const ftp = () => {
  configFtp.log = util.log;
  const ftConnect = vinylFTP.create(configFtp);
  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
  .pipe(app.plugins.gulpPlumber(
    app.plugins.gulpNotify.onError({
      title: 'ftp',
      messange: "Error: <%= error.messamge %>"
    })
  ))
  .pipe(ftConnect.dest(`/pawell.site/public_html/${app.path.ftp}/${app.path.rootFolder}`))
}