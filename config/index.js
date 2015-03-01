'use-strict';

var _ = require('lodash');

var minimist = require('minimist');

var rek = require('rekuire');

var logger = rek('build/utils/logger').get('config');

// Static config data
var static_cfg = require('./static');

// Active environment ID
var env = process ? process.env.NODE_ENV || static_cfg.env_type.DEVELOPMENT : static_cfg.env_type.DEVELOPMENT;

// CLI config data
var options = {
  string: ['env'],
  default: {
    env: env
  }
};

// TODO: Decide whether CLI should override process.env
var cli_cfg = minimist(process.argv.slice(2), options);

// Validate env value
if (!_.includes(static_cfg.env_type, cli_cfg.env)) {
  [
    '******************************************************',
    '  Warning:',
    '    Invalid \'env\' value \'' + cli_cfg.env + '\'',
    '    Defaulting to \'' + static_cfg.env_type.DEVELOPMENT + '\'',
    '******************************************************'
  ].map(function(msg) {
    logger.warn(msg);
  });
}

cli_cfg.env = static_cfg.env_type.DEVELOPMENT;

static_cfg = _.assign(static_cfg, cli_cfg);

// Default config data
var default_cfg = require('./default');

// Project config data
var project_cfg = require('./project');

// Override Default data with Project data
default_cfg = _.assign(default_cfg, project_cfg);

// Environment config data
var env_cfg = require('./envs/' + static_cfg.env);

// Override Default data with Environment data
default_cfg = _.assign(default_cfg, env_cfg);

// Add Default data to Static data (Default will not override Static)
static_cfg = _.defaults(static_cfg, default_cfg);

// Export
module.exports = static_cfg;
