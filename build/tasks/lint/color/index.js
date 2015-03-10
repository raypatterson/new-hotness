'use-strict';

var rek = require('rekuire');

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function() {

    var task_cfg = cfg.tasks[id];

    var logger = rek('build/utils/logger').get('lintcolor');

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.colorguard(task_cfg.options))
      .on('error', function(error) {

        var msg = error.message;

        [
          '******************************************************',
          '    Error : ' + msg.substring(msg.indexOf(':') + 2),
          '       In : ' + msg.substring(0, msg.indexOf(':')),
          '    Stopping process',
          '    Check logs for more information',
          '******************************************************'
        ].map(function(msg) {
          logger.warn(msg);
        });

        process.exit(1);
      })
      .pipe($.notify(task_cfg.notify))
      .pipe(gulp.dest(task_cfg.dest));
  });
};
