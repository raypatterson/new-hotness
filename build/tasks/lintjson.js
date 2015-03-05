'use-strict';

var rek = require('rekuire');

module.exports = function(gulp, $, cfg) {

  var logger = rek('build/utils/logger').get('lintjson');

  gulp.task('lintjson', function() {

    var task_cfg = cfg.tasks.lintjson;

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.jsonLint(task_cfg.options))
      .pipe($.jsonLint.report(function(lint, file) {

        if (file.success) {

          // Do nothing

        } else {

          [
            '******************************************************',
            '      Error : ' + lint.error,
            '         In : ' + file.path,
            '       Line : ' + lint.line,
            '  Character : ' + lint.character,
            '    Stopping process',
            '    Check logs for more information',
            '******************************************************'
          ].map(function(msg) {
            logger.warn(msg);
          });

          process.exit(1);
        }

      }))
      .pipe($.notify(task_cfg.notify));
  });
};
