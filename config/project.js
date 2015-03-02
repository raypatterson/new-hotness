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
    libs: 'libs',
    common: 'common'
  },

  tasks: {
    // Used by Modernizr and webpack tasks
    modernizr: {
      filename: 'modernizr.js'
    }
  }
};
