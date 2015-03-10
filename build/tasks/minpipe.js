'use-strict';

module.exports = function(gulp, $, cfg) {

  gulp.task('minpipe', function() {

    var task_cfg = cfg.tasks.minpipe;

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.pipemin({
        js: function(stream, concat) {
          return stream
            .pipe(concat);
        },
        css: function(stream, concat) {
          return stream
            .pipe(concat);
        }
      }))
      .pipe(gulp.dest(task_cfg.dest));
  });
};
