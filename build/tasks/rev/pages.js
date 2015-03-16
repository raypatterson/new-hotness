'use-strict';

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function(cb) {

    var task_cfg = cfg.tasks[id];

    return gulp.src(['**/*.html'], {
        cwd: task_cfg.cwd
      })
      .pipe($.revAll(task_cfg.options))
      .pipe(gulp.dest(task_cfg.dest))
  });
};
