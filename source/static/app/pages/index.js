'use-strict';

require('templates/base');
require('./index.scss');

module.exports = (function() {

  'use strict';

  var imageUrl = require('images/test.jpg');

  // TODO: Decide where to put images that are referenced this way
  console.log('imageUrl', imageUrl);
}());
