'use-strict';

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function(cb) {

    var task_cfg = cfg.tasks[id];

    // FIXME: Something is mutating the parallel task string values into object literals... Maybe the sequence task?
    console.log('cfg.tasks.build.sequence', cfg.tasks.build.sequence);

    cfg.tasks.build.sequence = [
      [
        'lint/json',
        'lint/js'
      ],
      [
        'process/webpack',
        'process/copy'
      ],
      'process/modernizr'
    ];

    console.log('cfg.tasks.build.sequence', cfg.tasks.build.sequence);

    $.sequence.apply(null, cfg.tasks.build.sequence)(cb);
  });
};
