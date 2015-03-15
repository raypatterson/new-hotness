'use-strict';

var parallelize = require('concurrent-transform');

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function() {

    var task_cfg = cfg.tasks[id];

    // Create a new publisher

    var publisher = $.awspublish.create({
      bucket: task_cfg.options.bucket
    });

    // Define custom headers

    var headers = {
      'Cache-Control': 'max-age=315360000, no-transform, public'
    };

    return gulp.src(task_cfg.src, {
      cwd: task_cfg.cwd
    })

    .pipe($.rename(function(path) {

      path.dirname = [task_cfg.options.dir, path.dirname].join('/');
    }))

    .pipe(parallelize(publisher.publish(headers, {
      force: true
    }), 50))

    .pipe(publisher.sync())

    // Create a cache file to speed up consecutive uploads

    .pipe(publisher.cache())

    // Print upload updates to console

    .pipe($.awspublish.reporter({
      // states: [
      //   'create',
      //   'update',
      //   'delete'
      // ]
    }));
  });
};
