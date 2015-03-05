'use-strict';

module.exports = function(gulp, $, cfg) {

  gulp.task('lintcss', function() {

    var task_cfg = cfg.tasks.lintcss;

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.csslint())
      .pipe($.csslint.reporter())
      .pipe($.notify(task_cfg.notify));
  });
};
