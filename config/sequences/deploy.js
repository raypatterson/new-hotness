'use-strict';

module.exports = {
  sequence: [
    'process/gzip',
    'deploy/aws/s3',
    'deploy/aws/cloudfront'
  ]
};
