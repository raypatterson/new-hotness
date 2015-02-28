'use-strict';

var path = require('path');
var glob = require('globby');
var merge = require('merge2');

module.exports = function(gulp, $, cfg) {

  var task_cfg = cfg.tasks.modernizr;
  var common_src = '*.js';
  var common_dir = path.join(cfg.dest, cfg.dir.common);
  var common_filename = glob.sync(common_src, {
    cwd: common_dir
  })[0];

  gulp.task('modernizr', function() {

    var commmon = gulp.src(common_src, {
      cwd: common_dir
    });

    var modernizr = gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.modernizr('not-writing-to-file-system', task_cfg.settings));

    return merge(modernizr, commmon)
      .pipe($.concat(common_filename))
      .pipe(gulp.dest(common_dir));
  });
};
