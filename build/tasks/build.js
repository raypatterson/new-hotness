'use-strict';

module.exports = function(gulp, $, cfg) {

  gulp.task('build', function(cb) {

    // FIXME: Something is mutating the parallel task string values into object literals... Maybe the sequence task?
    console.log('cfg.tasks.build.sequence', cfg.tasks.build.sequence);

    cfg.tasks.build.sequence = [
      [
        'lintjs',
        'lintjson'
      ],
      'webpack',
      'modernizr'
    ];

    console.log('cfg.tasks.build.sequence', cfg.tasks.build.sequence);

    $.sequence.apply(null, cfg.tasks.build.sequence)(cb);
  });
};
