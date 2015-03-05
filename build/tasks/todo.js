'use-strict';

var noop = function() {};

module.exports = function(gulp, $, cfg) {

  gulp.task('todo', function() {

    var task_cfg = cfg.tasks.todo;

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.todo(task_cfg.options))
      .pipe(gulp.dest(task_cfg.dest));
  });
};
