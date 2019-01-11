var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var connect = require("gulp-connect");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var babel = require("gulp-babel");

//创建一个任务

gulp.task("copy-html",function(){
	gulp.src("*.html")
	.pipe(gulp.dest("dist")).pipe(connect.reload());

});

gulp.task("copy-img",function(){
	
	gulp.src("img/**")
	.pipe(gulp.dest("dist/imgs"));
});
gulp.task('copy-js',function(){ 
    return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
 });

gulp.task('sass',function(){
	return gulp.src('sass/*.scss')
    .pipe(sourcemaps.init())// 
    .pipe(sass({outputStyle: 'compressed'}))
	.pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())   
});

gulp.task("watch",function(){
	
	gulp.watch(["img/**","sass/*.scss","js/*.js","*.html"],["copy-img","sass","copy-js","copy-html"]);
	
})


gulp.task("server",function(){
	connect.server({
		"root":"dist",
		"livereload":true
	})
});
//gulp.task("build",["hello","copyHtml","copy-imgs","data"]);
gulp.task("default",["server","watch"]);


