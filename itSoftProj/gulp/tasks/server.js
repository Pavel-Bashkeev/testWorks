export const server = (done) => {
  app.plugins.browserSync.init({
    server: {
      baseDir: `${app.path.build.root}`
    },
    notify: false,
    port: new Date().getFullYear(),
  })
}