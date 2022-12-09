import svgSprite from "gulp-svg-sprite";
import svgMin from "gulp-svgmin"; // минификация SVG
import cheerio from "gulp-cheerio"; // удаление лишних атрибутов из svg

export const spriteIcons = () => (
  app.gulp.src(app.path.src.svg)
  .pipe(app.plugins.gulpPlumber(
    app.plugins.gulpNotify.onError({
      title: 'svgSprite',
      messange: "Error: <%= error.messamge %>"
    })
  ))
  // .pipe(svgMin({
  //   js2svg: {
  //     pretty: true
  //   }
  // }))
  .pipe(cheerio({
    run: function ($) {
      $('[fill]').removeAttr('fill');
      $('[xmlns]').removeAttr('xmlns');
    },
    parserOptions: {
      xmlMode: true
    }
  }))
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(app.gulp.dest(app.path.build.img))
)