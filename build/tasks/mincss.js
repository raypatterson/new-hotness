'use-strict';

module.exports = function(gulp, $, cfg) {

  gulp.task('mincss', function() {

    var task_cfg = cfg.tasks.mincss;

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.csso(task_cfg.options))
      .pipe(gulp.dest(task_cfg.dest));
  });
};
