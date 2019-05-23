/*
 * Entry point for the app
 *
 */
"use strict";

const Hapi = require("hapi");
const dotenv = require('dotenv');
const result = dotenv.config();
const utils = require('./app/api/utils');

if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

require('./app/models/db');

// Create local server object
const server = Hapi.server({
  port: process.env.PORT || 3000,
  routes: { cors: true }
});

// Init function to start server
async function init() {
  await server.register(require('inert'));
  await server.register(require('vision'));
  await server.register(require('hapi-auth-cookie'));
  await server.register(require('hapi-auth-jwt2'));

  // Configure handlebars
  server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layouts',
    partialsPath: './app/views/partials',
    layout: true,
    isCached: false
  });

  server.auth.strategy('standard', 'cookie', {
    password: process.env.cookie_password,
    cookie: process.env.cookie_name,
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000,
    redirectTo: '/'
  });

  server.auth.strategy('jwt', 'jwt', {
    key: 'secretpassworddontrevealtoanyone',
    validate: utils.validate,
    verifyOptions: { algorithms: ['HS256']},
  });

  server.auth.default({
    mode: 'required',
    strategy: 'standard',
  });

  // Load the route
  server.route(require('./routes'));
  server.route(require('./routesapi'));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

// Catch and log errors on server start. Exit app
process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();

