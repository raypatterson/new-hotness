'use-strict';

var fs = require('fs-extra');
var del = require('del');
var glob = require('globby');
var path = require('path');
var cheerio = require('cheerio');
var vinylPaths = require('vinyl-paths');

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function() {

    var task_cfg = cfg.tasks[id];

    var files = vinylPaths();

    return gulp.src(task_cfg.json.src, {
        cwd: task_cfg.cwd
      })
      .pipe(files)
      .on('end', function() {

        var data = files.paths.reduce(function(ob, filepath) {

          ob[path.basename(filepath, path.extname(filepath))] = fs.readJsonSync(filepath, {
            cwd: task_cfg.cwd
          });


          return ob
        }, {});

        del.sync(files.paths);

        glob.sync(task_cfg.html.src, {
            cwd: task_cfg.cwd
          })
          .map(function(filepath) {

            filepath = path.resolve(task_cfg.cwd, filepath);

            var file = fs.readFileSync(filepath, 'utf-8');

            var $ = cheerio.load(file);

            var html = '' +
              '<script type="text/javascript">' +
              '(function(window){window.' + task_cfg.dataKeyName + '=' + JSON.stringify(data) + ';}(this))' +
              '</script>';

            $('body > script').first().before(html);

            fs.writeFileSync(filepath, $.html());

          });

      });
  });
};
