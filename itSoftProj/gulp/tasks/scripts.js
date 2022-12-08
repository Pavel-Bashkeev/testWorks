import webpackStream from "webpack-stream"
export const scripts = () => {
  return app.gulp.src(
      app.path.src.js, {
        sourcemaps: true
      }
    )
    .pipe(app.plugins.gulpPlumber(
      app.plugins.gulpNotify.onError({
        title: 'JS',
        messange: "Error: <%= error.messamge %>"
      })
    ))
    .pipe(app.plugins.gulpIf(app.isDev, app.plugins.sourceMaps.init({
      loadMaps:true
    })))
    .pipe(webpackStream({
      mode: app.isBuild ? 'production': 'development',
      output: {
        filename: 'main.min.js'
      }
    }))
    .pipe(app.plugins.gulpIf(app.isDev, app.plugins.sourceMaps.write()))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream())
}