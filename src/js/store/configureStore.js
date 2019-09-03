if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  module.exports = require('./storeSetupProd.js');
} else {
  // eslint-disable-next-line global-require
  module.exports = require('./storeSetupDev.js');
}
