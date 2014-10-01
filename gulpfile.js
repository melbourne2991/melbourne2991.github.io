var gulp      = require('gulp'),
    connect   = require('gulp-connect'),
    data      = require('gulp-data'),
    template  = require('gulp-template'),
    concat    = require('gulp-concat'),
    path      = require('path'),
    fs        = require('fs'),
    sass      = require('gulp-sass');

var postsPath = './src/content/posts/';
var postsArr  = fs.readdirSync(postsPath);
var posts     = [];

for(var i = 0; i < postsArr.length; i ++) {
  posts.push(fs.readFileSync(postsPath + postsArr[i], 'utf8'));
}

gulp.task('compile', function() {
  gulp.src('src/templates/index.html')
    .pipe(data(function(file) {
      var mdfile = fs.readFileSync('./src/content/index.md', 'utf8');
      return { posts: [mdfile, 'lol']  };
    }))
    .pipe(template())
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./'));
});
 
// gulp.task('compile', function() {
//   connect.server({
//     livereload: true
//   });
// });
 
// gulp.task('less', function() {
//   gulp.src('styles/main.less')
//     .pipe(less())
//     .pipe(gulp.dest('styles'))
//     .pipe(connect.reload());
// });
 
// gulp.task('watch', function() {
//   gulp.watch('styles/*.less', ['less']);
// })
 
// gulp.task('default', ['less', 'webserver', 'watch']);

gulp.task('default', ['compile']);