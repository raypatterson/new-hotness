'use-strict';

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function() {

    var task_cfg = cfg.tasks[id];

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.csso(task_cfg.options))
      .pipe(gulp.dest(task_cfg.dest));
  });
};
