'use-strict';

var _ = require('lodash');

var minimist = require('minimist');

var rek = require('rekuire');

var logger = rek('build/utils/logger').get('config');

// Protected config data (Cannot be overridden)
var protected_cfg = require('./protected');

// Default config data
var default_cfg = require('./default');

// Project config data
var project_cfg = require('./project');

// Override Default data with Project data
default_cfg = _.assign(default_cfg, project_cfg);

// Active environment ID
var env = process ? process.env.NODE_ENV || protected_cfg.env_type.DEVELOPMENT : protected_cfg.env_type.DEVELOPMENT;

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
if (!_.includes(protected_cfg.env_type, cli_cfg.env)) {
  [
    '******************************************************',
    '  Warning:',
    '    Invalid \'env\' value \'' + cli_cfg.env + '\'',
    '    Defaulting to \'' + protected_cfg.env_type.DEVELOPMENT + '\'',
    '******************************************************'
  ].map(function(msg) {
    logger.warn(msg);
  });

  cli_cfg.env = protected_cfg.env_type.DEVELOPMENT;
}

// Override Default data with CLI data
default_cfg = _.assign(default_cfg, cli_cfg);

// Environment config data
var env_cfg = require('./envs/' + default_cfg.env);

// Override Default data with Environment data
default_cfg = _.assign(default_cfg, env_cfg);

// Add production flag

// Add Default data to protected data (Will not be overridden)
protected_cfg = _.defaults(protected_cfg, default_cfg);

// Export
module.exports = protected_cfg;
