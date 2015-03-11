'use-strict';

var del = require('del');

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function(cb) {

    var task_cfg = cfg.tasks[id];

    del(task_cfg.patterns, cb);
  });
};
