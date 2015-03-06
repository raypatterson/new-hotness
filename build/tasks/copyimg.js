'use-strict';

module.exports = function(gulp, $, cfg) {

  gulp.task('copyimg', function() {

    var task_cfg = cfg.tasks.copyimg;

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe(gulp.dest(task_cfg.dest));
  });
};
