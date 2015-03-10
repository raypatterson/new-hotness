'use-strict';

var _ = require('lodash');
var path = require('path');
var glob = require('globby');

var gulp = require('gulp');

// Gulp plugins
var $ = require('gulp-load-plugins')({
  camelize: true
});

// Config data
var cfg = require('./config');

// Eliminate need for icky relative requires
var rek = require('rekuire');

// Module gets confused with same name files
rek.ignore(cfg.dir.cwd);

// Construct dynamic values
// TODO: Find a more elegant way of doing this
cfg.root = __dirname;
cfg.dest = cfg.dir[cfg.dest];

// Ensure tasks config object or use defaults
cfg.tasks = cfg.tasks || {};

// Merge build task config data
var task_name;
var tasks_cfg = glob.sync(['**/*.js'], {
    cwd: './config/tasks'
  })
  .reduce(function(tasks, filepath) {

    var task_name = path.basename(filepath, path.extname(filepath));

    if (task_name === 'index') {

      task_name = path.dirname(filepath);
    }

    tasks[task_name] = rek(path.join('config/tasks', task_name));
    return tasks;
  }, {});

_.merge(cfg.tasks, tasks_cfg);

// Initialize build tasks
for (task in cfg.tasks) {
  rek(path.join('build/tasks', task))(gulp, $, cfg, task);
};
