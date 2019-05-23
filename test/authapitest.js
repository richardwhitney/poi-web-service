'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures');
const utils = require('../app/api/utils');

suite('Authenticate API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const poiService = new PoiService(fixtures.poiService);

  setup(async function () {
    await poiService.deleteAllUsers();
  });

  test('authenticate', async function () {
    const returnedUser = await poiService.createUser(newUser);
    console.log(returnedUser);
    const response = await poiService.authenticate(newUser);
    console.log(response);
    assert(response.success);
    assert.isDefined(response.token);
  });
});