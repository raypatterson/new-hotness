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
var taskName;
var taskConfigs = glob.sync(['**/*.js'], {
    cwd: './config/tasks'
  })
  .reduce(function(tasks, filepath) {

    var taskName = path.basename(filepath, path.extname(filepath));

    if (taskName === 'index') {

      // Format .../[name]/index.js
      taskName = path.dirname(filepath);

    } else {

      // Format .../[name].js
      taskName = path.join(path.dirname(filepath), taskName);
    }

    var taskPath = path.join('config/tasks', taskName);

    tasks[taskName] = rek(taskPath);

    return tasks;

  }, {});

_.merge(cfg.tasks, taskConfigs);

// Initialize build tasks
for (task in cfg.tasks) {
  rek(path.join('build/tasks', task))(gulp, $, cfg, task);
};
