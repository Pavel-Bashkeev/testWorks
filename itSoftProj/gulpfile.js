// импорт модулей
import gulp from "gulp";
// импорт путей
import { path } from "./gulp/config/path.js";
// импорт плагинов
import { plugins } from "./gulp/config/plugins.js";
// глобальная переменная
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  gulp,
  path,
  plugins,
  isDevPug: process.argv.includes("--pug"),
};

//импорт задач
import { copyFile } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { styles, externalLibs } from "./gulp/tasks/styles.js";
import { scripts, externalScripts } from "./gulp/tasks/scripts.js";
import { images } from "./gulp/tasks/images.js";
import { fontsConvert } from "./gulp/tasks/fonts.js";
import { ftp } from "./gulp/tasks/ftp.js";
import { spriteIcons } from "./gulp/tasks/sprite.js";
// Наблюдатель за изменением в файлах
const watcher = () => {
  gulp.watch(app.path.watch.assets, copyFile);
  gulp.watch(app.path.watch.html, html);
  gulp.watch(app.path.watch.pug, html);
  gulp.watch(app.path.watch.scss, styles);
  gulp.watch(app.path.watch.exStyles, externalLibs);
  gulp.watch(app.path.watch.js, scripts);
  gulp.watch(app.path.watch.exJs, externalScripts);
  gulp.watch(app.path.watch.img, images);
  gulp.watch(app.path.watch.svg, spriteIcons);
  gulp.watch(app.path.watch.fonts, fonts);
};
//Задачи по шрифтам
const fonts = gulp.series(reset, fontsConvert);
// Основная задача
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(
    copyFile,
    html,
    styles,
    externalLibs,
    scripts,
    externalScripts,
    images,
    spriteIcons
  )
);
// Построение сценариев
const dev = gulp.series(mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

const deployFtp = gulp.series(reset, mainTasks, ftp);

export { dev };
export { build };
export { deployFtp };
// Выполнение сценариев
gulp.task("default", dev);
