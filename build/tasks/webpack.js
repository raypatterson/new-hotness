'use-strict';

var path = require('path');
var webpack = require('webpack');

module.exports = function(gulp, $, cfg) {

  gulp.task('webpack', function() {
    return gulp.src('**/*.{js}', {
        cwd: path.join(cfg.dir.cwd, cfg.dir.app)
      })
      .pipe($.webpack(cfg.tasks.webpack, webpack))
      .pipe(gulp.dest(cfg.dest));
  });
};
