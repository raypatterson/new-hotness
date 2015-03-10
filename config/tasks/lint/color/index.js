'use-strict';

var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dest,
  src: [
    '**/*.css',
    '!' + path.join('**', cfg.dir.vendor, '**')
  ],
  options: {

    // Be verbose and log files that have no collisions.
    logOk: true,

    // 0 through 100. Lower is more similar. Anything below 3 warns you.
    // 3 is the default threshold, but that's mostly personal opinion
    threshold: 3,

    // This color is just ignored entirely (use with caution)
    // ignore: [
    //   '#030303'
    // ],

    // These color combinations are ignored (usually use this)
    // whitelist: [
    //   [
    //     '#000000',
    //     '#010101'
    //   ]
    // ]
  },
  dest: cfg.dest,
  notify: {
    title: 'Color Lint',
    message: 'Color Lint Passed.',
  }
};
