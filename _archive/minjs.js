'use-strict';

module.exports = function(gulp, $, cfg) {

  gulp.task('minjs', function() {

    var task_cfg = cfg.tasks.minjs;

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.uglify(task_cfg.options))
      .pipe(gulp.dest(task_cfg.dest));
  });
};
