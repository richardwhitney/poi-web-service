'use strict';

const assert = require('chai').assert;
const _ = require('lodash');
const PoiService = require('./poi-service');
const fixtures = require('./fixtures');

suite('Category API test', function() {

  let categories = fixtures.categories;
  let newCategory = fixtures.newCategory;
  let newPoint = fixtures.newPoint;
  let newUser = fixtures.newUser;

  const poiService = new PoiService(fixtures.poiService);

  setup(async function() {
    await poiService.deleteAllUsers();
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(newUser);
    await poiService.deleteAllCategories();
  });

  teardown(async function() {
    await poiService.deleteAllCategories();
    await poiService.deleteAllUsers();
    await poiService.clearAuth();
  });

  test('create a category', async function() {
    const returnedCategory = await poiService.createCategory(newCategory);
    assert(_.some([returnedCategory], newCategory), 'returnedCategory must be a superset of newCategory');
    assert.isDefined(returnedCategory._id);
  });

  test('get a category', async function() {
    const c1 = await poiService.createCategory(newCategory);
    const c2 = await poiService.getCategory(c1._id);
    assert.deepEqual(c1, c2);
  });

  test('get invalid category', async function() {
    const c1 = await poiService.getCategory('1234');
    assert.isNull(c1);
    const c2 = await poiService.getCategory('012345678901234567890');
    assert.isNull(c2);
  });

  test('delete a category', async function() {
    let c = await poiService.createCategory(newCategory);
    assert(c._id != null);
    await poiService.deleteOneCategory(c._id);
    c = await poiService.getCategory(c._id);
    assert(c == null);
  });

  test('get all categories', async function() {
    for (let c of categories) {
      await poiService.createCategory(c);
    }

    const allCategories = await poiService.getCategories();
    assert.equal(allCategories.length, categories.length);
  });

  test('get categories points', async function() {
    const c = await poiService.createCategory(newCategory);
    await poiService.createPoint(c._id, newPoint);
    const points = await poiService.getCategoryPoints(c._id);
    assert.equal(points.length, 1);
    assert(_.some([points[0]], newPoint), 'returnedPoint must be a superset of newPoint');
    assert.isDefined(points[0]._id);
  });

  test('get categories detail', async function() {
    for (let c of categories) {
      await poiService.createCategory(c);
    }

    const allCategories = await poiService.getCategories();
    for (let i = 0; i < categories.length; i++) {
      assert(_.some([allCategories[i]], categories[i]), 'returnedCategory must be a superset of newCategory');
    }
  });

  test('get all categories empty', async function() {
    const allCategories = await poiService.getCategories();
    assert.equal(allCategories.length, 0);
  });

})