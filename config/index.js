'use-strict';

var _ = require('lodash');

// Static config data
var static_cfg = require('./static');

// Active environment ID
var env = process ? process.env.NODE_ENV || static_cfg.env_type.DEVELOPMENT : static_cfg.env_type.DEVELOPMENT;

// Default config data
var default_cfg = require('./default');

// Project config data
var project_cfg = require('./project');

// Override Default data with Project data
default_cfg = _.assign(default_cfg, project_cfg);

// Environment config data
var env_cfg = require('./envs/' + env);

// Override Default data with Environment data
default_cfg = _.assign(default_cfg, env_cfg);

// Add Default data to Static data (Default will not override Static)
static_cfg = _.defaults(static_cfg, default_cfg);

// Export
module.exports = static_cfg;
