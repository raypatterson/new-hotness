'use-strict';

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function() {

    var task_cfg = cfg.tasks[id];

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.htmlhint(task_cfg.options))
      .pipe($.htmlhint.reporter())
      .pipe($.htmlhint.failReporter())
      .pipe($.notify(task_cfg.notify));
  });
};
