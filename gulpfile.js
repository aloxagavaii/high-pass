const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const autoPrefixer = require('gulp-autoprefixer');
// const image = require('gulp-image');
// const del = require('del');
var ttf2woff = require('gulp-ttf2woff');
var ttf2woff2 = require('gulp-ttf2woff2');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

const fonts = () => {
  src('src/fonts/**.woff').pipe(ttf2woff()).pipe(dest('dist/fonts'));
  return src('src/fonts/**.woff2').pipe(ttf2woff2()).pipe(dest('dist/fonts/'));
};

const clean = () => {
  return del(['dist']);
};

const styles = () => {
  return src('./src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', notify.onError())
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css/'));
};

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest('dist'));
};

const htmlInclude = () => {
  return src(['src/index.html'])
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const images = () => {
  return (
    src([
      './src/image/**/*.jpg',
      './src/image/**/*.png',
      './src/image/**/*.svg',
      './src/image/**/*.jpeg',
    ])
      // .pipe(image())
      .pipe(dest('dist/images'))
  );
};

const scripts = () => {
  return src(['src/js/**/*.js'])
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(concat('app.js'))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });
  watch('./src/styles/**/*.scss', styles);
  watch('./src/index.html', htmlInclude);
  watch('./src/fonts/**.ttf', fonts);
  watch('./src/js/**/*.js', scripts);
};

exports.htmlMinify = htmlMinify;
exports.htmlInclude = htmlInclude;
exports.styles = styles;
exports.watchFiles = watchFiles;
exports.clean = clean;

exports.default = series(
  htmlInclude,
  fonts,
  styles,
  scripts,
  images,
  watchFiles
);
