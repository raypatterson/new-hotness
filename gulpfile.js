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

var addTasksToConfig = function addTasksToConfig(cfg, tasksType, src, cwd) {

  // Ensure config object or use defaults
  cfg[tasksType] = cfg[tasksType] || {};

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

// Merge build task config data

var taskConfigs = addTasksToConfig(cfg, 'tasks', ['**/*.js'], './config/tasks');

_.merge(cfg.tasks, taskConfigs);

// Initialize build tasks
for (task in cfg.tasks) {
  rek(path.join('build/tasks', task))(gulp, $, cfg, task);
};

// Ensure tasks config object or use defaults
cfg.sequences = cfg.sequences || {};

var sequenceConfigs = glob.sync(['**/*.js'], {
    cwd: './config/sequences'
  })
  .reduce(function(sequences, filepath) {

    taskName = path.basename(filepath, path.extname(filepath));

    if (taskName === 'index') {

      // Format .../[name]/index.js
      taskName = path.dirname(filepath);

    } else {

      // Format .../[name].js
      taskName = path.join(path.dirname(filepath), taskName);
    }

    taskPath = path.join('config/sequences', taskName);

    taskConfig = rek(taskPath);
    taskConfig.isSequence = true;

    sequences[taskName] = taskConfig;

    return sequences;

  }, {});

_.merge(cfg.sequences, sequenceConfigs);

// Initialize build task sequences
for (sequence in cfg.sequences) {
  rek('build/utils/sequencer')(gulp, $, cfg, sequence);
};
