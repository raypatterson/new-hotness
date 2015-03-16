'use-strict';

var del = require('del');
var vinylPaths = require('vinyl-paths');

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function(cb) {

    var task_cfg = cfg.tasks[id];

    var files = vinylPaths();

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe(files)
      .pipe($.revAll(task_cfg.options))
      .pipe(gulp.dest(task_cfg.dest))
      .pipe($.revAll.manifest(task_cfg.manifest))
      .pipe(gulp.dest(task_cfg.dest))
      .on('end', function(ecb) {

        del.sync(task_cfg.options.ignore.reduce(function(o, pattern) {

          return files.paths.filter(function(path) {

            return path.search(pattern) === -1;
          });
        }, null));
      });
  });
};
