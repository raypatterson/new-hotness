'use-strict';

var _ = require('lodash');

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
cfg.tasks = _.merge(cfg.tasks, require('require-directory')(module, 'config/tasks'));

// Initialize build tasks
for (task in cfg.tasks) {
  rek('build/tasks/' + task)(gulp, $, cfg);
};
