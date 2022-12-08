import replace from 'gulp-replace'; // Поиск и замена
import gulpPlumber from 'gulp-plumber';// Обработчик ошибок
import gulpNotify from 'gulp-notify';// Подсказки
import browserSync from 'browser-sync';// Сервер
import rename from 'gulp-rename'; //Изменения имени
import newer from 'gulp-newer'; //Проверка обновлений
import gulpIf from 'gulp-if'; // условия
import  sourceMaps  from 'gulp-sourcemaps'; // карта в режиме dev
import changed from 'gulp-changed';// Проверяет был ли изменен файл перед началом задачи

export const plugins = {
  replace,
  gulpPlumber,
  gulpNotify,
  browserSync,
  rename,
  newer,
  gulpIf,
  sourceMaps,
  changed
}