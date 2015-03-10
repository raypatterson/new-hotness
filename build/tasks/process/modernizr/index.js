'use-strict';

var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var modernizr = require('modernizr');

module.exports = function(gulp, $, cfg, id) {

  var task_cfg = cfg.tasks[id];

  var modernizr_dest = path.join(cfg.root, task_cfg.dest, task_cfg.filename);

  var modernizr_cfg = require('modernizr/lib/config-all.json');

  // Exclude tests
  _.each(task_cfg.settings.excludeTests, function(excludeTest) {

    _.remove(modernizr_cfg['feature-detects'], function(testName) {

      return testName === excludeTest;
    });
  });

  gulp.task(id, function(cb) {

    if (task_cfg.crawl === true) {

      gulp.src(task_cfg.src, {
          cwd: task_cfg.cwd
        })
        .pipe($.modernizr(task_cfg.filename, task_cfg.settings))
        .pipe(gulp.dest(task_cfg.dest))
        .on('end', cb);


    } else {


      if (fs.existsSync(modernizr_dest)) {

        cb();

      } else {

        modernizr.build(modernizr_cfg, function(result) {

          // console.log(result); // the build

          fs.outputFile(modernizr_dest, result, function(err) {

            if (err !== null) {
              console.log(err);
            }

            cb();
          })
        });
      }
    }
  });
};
