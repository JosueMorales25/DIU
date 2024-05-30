// vue.config.js
module.exports = {
    devServer: {
      host: '0.0.0.0',
      port: 8080, // the port you exposed in docker-compose
      public: '0.0.0.0:8080',
      disableHostCheck: true,
    },
  };
  