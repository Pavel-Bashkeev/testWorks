import dartSass from 'sass';
import gulpSass from 'gulp-sass';

import cleanCss from 'gulp-clean-css'; // Сжатие css файла
import webpCss from 'gulp-webpcss' // Вывод WEBP изображений
import autoPrefixer from 'gulp-autoprefixer'; // Добовление вендорных префиксов
import gcmq from 'gulp-group-css-media-queries' // Групировка медиа запросов

const sass = gulpSass(dartSass);

export const styles = () => {
  return app.gulp.src(
      app.path.src.scss
    )
    .pipe(app.plugins.gulpPlumber(
      app.plugins.gulpNotify.onError({
        title: 'SCSS',
        messange: "Error: <%= error.messamge %>"
      })
    ))
    .pipe(app.plugins.gulpIf(app.isDev, app.plugins.sourceMaps.init({
      loadMaps:true
    })))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(app.plugins.gulpIf(app.isBuild, gcmq()))
    .pipe(webpCss({
      webpClass: '.webp',
      noWebpClass: '.no-webp'
    }))
    .pipe(app.plugins.gulpIf(app.isBuild,
      autoPrefixer({
        grid:true,
        overrideBrowserslist: ['last 5 version'],
        cascade: true
      })
    ))
    .pipe(app.plugins.replace(/@img\//g, '../images/'))
    .pipe(app.plugins.gulpIf(
      app.isBuild,
      cleanCss({
        level: {
          1: {
            specialComments: 0,
          },
        },
      })
    ))
    .pipe(app.plugins.rename({
      extname: '.min.css'
    }))
    .pipe(app.plugins.gulpIf(app.isDev, app.plugins.sourceMaps.write()))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream())
}