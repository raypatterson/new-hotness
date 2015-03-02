'use-strict';

module.exports = function(gulp, $, cfg) {

  gulp.task('minjson', function() {

    var task_cfg = cfg.tasks.minjson;

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.jsonmin(task_cfg.options))
      .pipe(gulp.dest(task_cfg.dest));
  });
};
