'use-strict';

var path = require('path');

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function(cb) {

    var task_cfg = cfg.tasks[id];

    var sequence = [{
        id: 'rev',
        stream: gulp.src(task_cfg.src, {
            cwd: task_cfg.cwd
          })
          .pipe($.revAll(task_cfg.rev.options))
          .pipe(gulp.dest(task_cfg.cwd))
      }, {
        id: 'update',
        stream: gulp.src(task_cfg.src, {
            cwd: task_cfg.cwd
          })
          .pipe($.cloudfront(task_cfg.cloudfront.options))
      }]
      .map(function(task) {

        task.id = path.join(id, task.id);

        gulp.task(task.id, function() {
          return task.stream;
        });

        return task;
      })
      .reduce(function(arr, task) {

        arr.push(task.id);

        return arr;
      }, []);

    $.sequence.apply(null, sequence)(cb);
  });
};
