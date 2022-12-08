import fileInclude from "gulp-file-include";
import htmlWebpNoSvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import gulpPug from "gulp-pug";


let extensionFiles = process.argv.includes('--pug') ? 'pug' : 'html'
const flagExtension = (params) => {
  let myExtension = params;
  return myExtension === 'html' ? true : false;
}
export const html = () => {
  return app.gulp.src(
      app.plugins.gulpIf(
        flagExtension(extensionFiles),
        app.path.src.html,
        app.path.src.pug,
      )
    )
    .pipe(app.plugins.gulpPlumber(
      app.plugins.gulpNotify.onError({
        title: extensionFiles,
        messange: "Error: <%= error.messamge %>"
      })
    ))
    .pipe(app.plugins.gulpIf(
      flagExtension(extensionFiles),
      fileInclude({
        prefix: '@@',
        basepath: '@file'
      }),
      gulpPug({
        pretty: true,
      })
    ))
    .pipe(app.plugins.replace(/@img\//g, 'images/'))
    .pipe(htmlWebpNoSvg())
    .pipe(app.plugins.gulpIf(
      app.isBuild,
      versionNumber({
        'value': '%DT%',
        'append': {
          'key': '_v',
          'cover': 0,
          'to': [
            'css',
            'js',
          ]
        },
        'output': {
          'file': 'gulp/version.json'
        }
      })))
    .pipe(app.gulp.dest(app.path.build.root))
    .pipe(app.plugins.browserSync.stream())
}