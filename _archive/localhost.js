'use-strict';

var bs = require('browser-sync');

module.exports = function(gulp, $, cfg) {

  gulp.task('localhost', function() {

    bs({
      notify: false,
      logPrefix: 'server',
      server: [cfg.dest, cfg.dir.app]
    });

    var watcher = gulp.watch(
      cfg.tasks.localhost.watch.files, [
        'build',
        bs.reload
      ]
    );

    watcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  });
};
