'use-strict';

var noop = function() {};

module.exports = function(gulp, $, cfg) {

  gulp.task('stylesass', function() {

    var task_cfg = cfg.tasks.stylesass;

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.csscomb(task_cfg.configPath))
      .pipe(gulp.dest(task_cfg.dest));
  });
};
