'use-strict';

module.exports = {
  sequence: [
    'compile',
    'process/gzip',
    'deploy/aws/s3'
  ]
};
