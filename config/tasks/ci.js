'use-strict';

module.exports = {
  sequence: [
    'compile',
    'process/gzip',
    'publish/aws/s3'
  ]
};
