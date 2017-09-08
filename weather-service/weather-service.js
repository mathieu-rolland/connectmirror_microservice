/**
* @name Weather
* @summary Weather Hydra Express service entry point
* @description Get weather on internet
*/
'use strict';

const version = require('./package.json').version;
const hydraExpress = require('hydra-express');
var path = require('path');

const HydraExpressLogger = require('fwsp-logger').HydraExpressLogger;
hydraExpress.use(new HydraExpressLogger());

let config = require('fwsp-config');

/**
* Load configuration file and initialize hydraExpress app
*/
config.init('./config/config.json')
  .then(() => {
    config.version = version;
    return hydraExpress.init(config.getObject(), version, () => {
      
      const app = hydraExpress.getExpressApp();
      app.set('views', path.join(__dirname, 'views'));
      app.set('view engine', 'twig');

      hydraExpress.registerRoutes({
        '/v1/weather': require('./routes/weather-v1-routes')
      });

    });
  })
  .then(serviceInfo => console.log('serviceInfo', serviceInfo))
  .catch(err => console.log('err', err));
