
export const copyFile = () => {
  return app.gulp.src(app.path.src.assets)
  .pipe(app.gulp.dest(app.path.build.assets))
}