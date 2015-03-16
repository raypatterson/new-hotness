'use-strict';

module.exports = {
  sequence: [
    'rev/pages',
    'process/gzip',
    'deploy/aws/s3',
    'deploy/aws/cloudfront'
  ]
};
