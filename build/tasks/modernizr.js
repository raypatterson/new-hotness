'use-strict';

var path = require('path');
var glob = require('globby');
var merge = require('merge2');

module.exports = function(gulp, $, cfg) {

  var task_cfg = cfg.tasks.modernizr;

  gulp.task('modernizr', function() {

    // TOOD: If 'development' mode, inject all of Modernizr for speed

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.modernizr(task_cfg.filename, task_cfg.settings))
      .pipe(gulp.dest(task_cfg.dest));
  });
};
