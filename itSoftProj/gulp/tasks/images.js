import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
  return app.gulp.src(
      app.path.src.img
    )
    .pipe(app.plugins.gulpPlumber(
      app.plugins.gulpNotify.onError({
        title: 'IMAGES',
        messange: "Error: <%= error.messamge %>"
      })
    ))
    .pipe(app.plugins.changed(app.path.build.fonts))
    .pipe(app.plugins.newer(app.path.build.img))
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.gulp.src(app.path.src.img))
    .pipe(app.plugins.newer(app.path.build.img))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true,
      optimizationLevel: 3 // 0 to 7
    }))
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.svg))
    .pipe(app.plugins.browserSync.stream())
}