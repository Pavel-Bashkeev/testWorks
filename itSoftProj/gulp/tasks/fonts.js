import ttf2woff from 'gulp-ttf2woff';
import ttf2eot from 'gulp-ttf2eot';
import ttf2woff2 from 'gulp-ttf2woff2';


export const fontsConvert = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`)
  .pipe(app.plugins.gulpPlumber(
    app.plugins.gulpNotify.onError({
      title: 'Fonts',
      messange: "Error: <%= error.messamge %>"
    })
  ))
  // .pipe(app.plugins.changed(app.path.src.fonts))
  .pipe(ttf2woff())
  .pipe(app.gulp.dest(app.path.build.fonts))
  .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
  .pipe(ttf2woff2())
  .pipe(app.gulp.dest(app.path.build.fonts))
  .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
  .pipe(ttf2eot())
  .pipe(app.gulp.dest(app.path.build.fonts))
  .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
  .pipe(app.gulp.dest(app.path.build.fonts))
}