/**
 * @name weather-v1-api
 * @description This module packages the Weather API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');
var weatherController = require('../controllers/WeatherController');

let serverResponse = new ServerResponse();
express.response.sendError = function(err) {
  serverResponse.sendServerError(this, {result: {error: err}});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, {result});
};

let api = express.Router();

api.get('/', (req, res) => {
  res.sendOk({greeting: 'Weather welcom page'});
});

api.get('/weather' , weatherController.getActualWeather );

module.exports = api;
