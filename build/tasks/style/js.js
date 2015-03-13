'use-strict';

var noop = function() {};

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function() {

    var task_cfg = cfg.tasks[id];

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.jscsCustom(task_cfg.options))
      // .pipe($.notify(task_cfg.notify))
    ;
  });
};
