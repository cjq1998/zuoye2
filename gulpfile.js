const gulp = require("gulp");
const gSass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const gCss = require('gulp-clean-css');
const babel = require('gulp-babel');
const webserver = require('gulp-webserver');
const uglify = require('gulp-uglify');



// const gulpSass = require("gulp-sass"); //编译sass
// const gulpBabel = require("gulp-babel"); //编译js
// const webserver = require("gulp-webserver"); //起服务

//编译sass
gulp.task('sass', function() {
    return gulp.src('./src/css/*.scss')
        .pipe(gSass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./public/css'));
});

//编译js
gulp.task('devJs', () => {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))

})


//编译html
gulp.task('devHtml', () => {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./public'))
})

gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(webserver({
            port: 8888,
            livereload: true,
        }))
})



//监听
gulp.task('watching', function() {
    gulp.watch('./src/css/*.scss', gulp.series('sass'));
    gulp.watch('./src/js/*.js', gulp.series('devJs'));
    gulp.watch('./src/*.html', gulp.series('devHtml'));
});


gulp.task('go', gulp.series('sass', 'devJs', 'devHtml', 'server', 'watching'))