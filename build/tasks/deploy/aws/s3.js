'use-strict';

var awspublish = require('gulp-awspublish');

var parallelize = require('concurrent-transform');

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function() {

    var task_cfg = cfg.tasks[id];

    // create a new publisher
    var publisher = awspublish.create({
      bucket: process.env.S3_BUCKET_NAME
    });

    // define custom headers
    var headers = {
      'Cache-Control': 'max-age=315360000, no-transform, public'
    };

    return gulp.src(task_cfg.src, {
      cwd: task_cfg.cwd
    })

    .pipe($.rename(function(path) {
      path.dirname = [cfg.deploy.dir, path.dirname].join('/');
    }))

    .pipe(parallelize(publisher.publish(headers, {
      // force: true
    }), 50))

    .pipe(publisher.sync())

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

    // print upload updates to console
    .pipe(awspublish.reporter({
      // states: [
      //   'create',
      //   'update',
      //   'delete'
      // ]
    }));
  });
};
