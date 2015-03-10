'use-strict';

var glob = require('globby');
var path = require('path');

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function(cb) {

    var task_cfg = cfg.tasks[id];

    // Alias the current dir
    var cwd = task_cfg.cwd;

    // Task list
    var sequence = [];

    // Task compiler
    var addTaskToSequence = function addTaskToSequence(task_cfg) {

      glob.sync(task_cfg.css.src, {
          cwd: cwd
        })
        .map(function(src) {

          var dest = path.dirname(path.join(cwd, src));

          var task_id = path.join(id, dest);

          var html_cwd = task_cfg.html.cwd || dest;

          var html = glob.sync(task_cfg.html.src, {
              cwd: html_cwd
            })
            .map(function(filename) {
              return path.join(html_cwd, filename);
            });

          gulp.task(task_id, function() {

            return gulp.src(src, {
                cwd: cwd
              })
              .pipe($.uncss({
                html: html
              }))
              .pipe(gulp.dest(dest));
          });

          sequence.push(task_id);
        });
    };

    task_cfg.inputs.map(function(input) {
      addTaskToSequence(input);
    });

    // FIXME: There is an error when tasks are run in parallel
    $.sequence.apply(null, sequence)(cb);
  });
};