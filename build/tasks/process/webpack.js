'use-strict';

var path = require('path');
var webpack = require('webpack');

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function() {

    var task_cfg = cfg.tasks[id];

    return gulp.src('**/*.{js}', {
        cwd: path.join(cfg.dir.cwd, cfg.dir.app)
      })
      .pipe($.webpack(task_cfg, webpack))
      .pipe(gulp.dest(cfg.dest));
  });
};
