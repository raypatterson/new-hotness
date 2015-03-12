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


// Helper functions for adding tasks

var getTasks = function getTasks(src, cwd) {

  var taskName;
  var taskPath;
  var taskConfig;

  return glob.sync(src, {
      cwd: cwd
    })
    .reduce(function(tasks, filepath) {

      taskName = path.basename(filepath, path.extname(filepath));

      if (taskName === 'index') {

        // Format .../[name]/index.js
        taskName = path.dirname(filepath);

      } else {

        // Format .../[name].js
        taskName = path.join(path.dirname(filepath), taskName);
      }

      taskPath = path.join(cwd, taskName);

      taskConfig = rek(taskPath);

      tasks[taskName] = taskConfig;

      return tasks;

    }, {});
};

var initTasks = function initTasks(cfg, key, tasks, handler) {

  cfg[key] = cfg[key] || {};

  _.forIn(_.merge(cfg[key], tasks), handler);
};

// Add tasks

var taskConfigs;

taskConfigs = getTasks(['**/*.js'], 'config/tasks');

initTasks(cfg, 'tasks', taskConfigs, function(val, key) {
  rek(path.join('build/tasks', key))(gulp, $, cfg, key);
});

taskConfigs = getTasks(['**/*.js'], 'config/sequences');

initTasks(cfg, 'sequences', taskConfigs, function(val, key) {
  rek('build/utils/sequencer')(gulp, $, cfg, key);
});
