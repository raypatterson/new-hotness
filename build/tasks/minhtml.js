'use-strict';

module.exports = function(gulp, $, cfg) {

  gulp.task('minhtml', function() {

    var task_cfg = cfg.tasks.minhtml;

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.htmlmin(task_cfg.options))
      .pipe(gulp.dest(task_cfg.dest));
  });
};
