'use-strict';

var rek = require('rekuire');

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function() {

    var task_cfg = cfg.tasks[id];

    var logger = rek('build/utils/logger').get('lintjs');

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.jshint(task_cfg.options))
      .pipe($.jshint.reporter(task_cfg.reporter))
      .pipe($.jshint.reporter('fail'))
      .on('error', function(error) {
        [
          '******************************************************',
          '  ' + error.message,
          '    Stopping process',
          '    Check logs for more information',
          '******************************************************'
        ].map(function(msg) {
          logger.warn(msg);
        });

        process.exit(1);
      })
      // .pipe($.notify(task_cfg.notify))
    ;
  });
};
