'use-strict';

// Project specific

module.exports = {

  name: 'New Hotness',

  dir: {
    // Project 'source'
    cwd: 'source/static',
    // App 'source'
    app: 'app',
    // Build 'dest'
    temp: '.tmp', // 'development' build target
    dist: 'dist', // 'production' build target
    // Build 'dest' sub directories
    vendor: 'vendor', // Separate 3rd party assets for clarity and to work around certain tasks
    common: 'common', // Assets common to all app entry points
    config: 'config' // Any page or module specific configuration
  },

  tasks: {
    // Used by Modernizr and webpack tasks
    modernizr: {
      filename: 'modernizr.js'
    }
  }
};
