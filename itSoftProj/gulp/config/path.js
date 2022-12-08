import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./build`;
const srcFolder = `./src`;

export const path = {
  build: {
    root: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js:`${buildFolder}/js/`,
    img:`${buildFolder}/images/`,
    svg: `${buildFolder}/images/icons/`,
    fonts: `${buildFolder}/fonts/`,
    assets: `${buildFolder}/assets/`
  },
  src: {
    html: `${srcFolder}/html/*.html`,
    pug: `${srcFolder}/pug/*.pug`,
    scss: `${srcFolder}/scss/*.scss`,
    js:`${srcFolder}/js/main.js`,
    img: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/icons/*.svg`,
    fonts: `${srcFolder}/fonts/**/.*`,
    assets: `${srcFolder}/assets/**/*.*`,
  },
  watch: {
    html: `${srcFolder}/html/**/*.html`,
    pug: `${srcFolder}/pug/**/*.pug`,
    scss: `${srcFolder}/**/*.scss`,
    js:`${srcFolder}/js/**/*.js`,
    img: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,ico,svg,webp}`,
    svg: `${srcFolder}/images/icons/*.svg`,
    fonts: `${srcFolder}/fonts/`,
    assets: `${srcFolder}/assets/**/*.*`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  rootFolder,
  ftp: `test`
}