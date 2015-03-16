'use-strict';

var path = require('path');

var hashLength = 16;
var hashSeparator = '.';

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
    usemin: 'usemin', // For files run though the 'usemin' type tasks
    vendor: 'vendor', // Separate 3rd party assets for clarity and to work around certain tasks
    common: 'common', // Assets common to all app entry points
    config: 'config', // Any page or module specific configuration
    // Asset type specific directories
    images: 'images',
    fonts: 'fonts',
    data: 'data',
    css: 'css',
    js: 'js'
  },

  plugins: {

    // Used by Modernizr and webpack task configs
    modernizr: {
      filename: 'modernizr.js'
    },

    rev: {
      options: {
        hashLength: hashLength

        /*

          transformFilename: function(file, hash) {
            var ext = path.extname(file.path);
            return hash.substr(0, hashLength) + hashSeparator + path.basename(file.path, ext) + ext;
          }

          FIXME: Prefix filename with has in order to distribute object requests across S3  partitions

            Source: https://aws.amazon.com/blogs/aws/amazon-s3-performance-tips-tricks-seattle-hiring-event/

          All 'common' file paths are prefixed twice in the HTML and will not resolve.
          Issue related to the 'minpipe' task.

         */
      }
    },

    /*

      All AWS tasks use the following env options

      {
        key: '', // AWS_ACCESS_KEY_ID
        secret: '', // AWS_SECRET_ACCESS_KEY
        bucket: '', // S3_BUCKET_NAME
        region: 'us-standard', // Valid default

      }

    */

    s3: {
      options: {
        dir: 'development',
        bucket: process.env.S3_BUCKET_NAME // Keep this out of the code base
      }
    },

    cloudfront: {
      options: {
        patternIndex: new RegExp('^\/index\.[a-f0-9]{' + hashLength + '}\.html(\.gz)*$', 'gi'), // Default is -->  /^\/index\.[a-f0-9]{8}\.html(\.gz)*$/gi
        distributionId: 'E2PZBFQ60PC70P'
      }
    }
  }
};
