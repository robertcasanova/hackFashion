var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'roda'
    },
    port: 3000,
    db: 'mongodb://robb:1234abcd@ds033380.mongolab.com:33380/roda'

  },

  test: {
    root: rootPath,
    app: {
      name: 'roda'
    },
    port: 3000,
    db: 'mongodb://robb:1234abcd@ds033380.mongolab.com:33380/roda'

  },

  production: {
    root: rootPath,
    app: {
      name: 'roda'
    },
    port: 3000,
    db: 'mongodb://robb:1234abcd@ds033380.mongolab.com:33380/roda'

  }
};

module.exports = config[env];
