'use-strict';

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function(cb) {

    var task_cfg = cfg.tasks[id];

    $.sequence.apply(null, task_cfg.sequence)(cb);
  });
};
