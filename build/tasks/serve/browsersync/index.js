'use-strict';

var bs = require('browser-sync');

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function() {

    var task_cfg = cfg.tasks[id];

    bs({
      notify: false,
      logPrefix: 'server',
      server: [cfg.dest, cfg.dir.app]
    });

    var watcher = gulp.watch(
      task_cfg.watch.files, [
        'build',
        bs.reload
      ]
    );

    watcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  });
};
