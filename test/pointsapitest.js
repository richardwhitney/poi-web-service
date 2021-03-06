'use strict';

const assert = require('chai').assert;
const _ = require('lodash');
const PoiService = require('./poi-service');
const fixtures = require('./fixtures');

suite('Point API test', function() {

  let points = fixtures.points;
  let newPoint = fixtures.newPoint;
  let newCategory = fixtures.newCategory;
  let newUser = fixtures.newUser;

  const poiService = new PoiService(fixtures.poiService);

  setup(async function () {
    await poiService.deleteAllUsers();
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(newUser);
    await poiService.deleteAllCategories();
    await poiService.deleteAllPoints();
  });

  teardown(async function () {
    await poiService.deleteAllCategories();
    await poiService.deleteAllPoints();
    await poiService.deleteAllUsers();
    await poiService.clearAuth();
  });

  test('create a point', async function() {
    const returnedCategory = await poiService.createCategory(newCategory);
    const returnedPoint = await poiService.createPoint(returnedCategory._id, newPoint);
    const returnedPoints = await poiService.getCategoryPoints(returnedCategory._id);
    assert.equal(returnedPoints.length, 1);
    assert(_.some([returnedPoints[0]], newPoint), 'returnedPoint must be a superset of newPoint');
    assert.isDefined(returnedPoint._id);
  });

  test('get point', async function() {
    const returnedCategory = await poiService.createCategory(newCategory);
    const p1 = await poiService.createPoint(returnedCategory._id, newPoint);
    const p2 = await poiService.getPoint(p1._id);
    assert.deepEqual(p1, p2);
  });

  test('get invalid point', async function() {
    const p1 = await poiService.getPoint('1234');
    assert.isNull(p1);
    const p2 = await poiService.getPoint('0123456789012345678901234567890');
    assert.isNull(p2);
  });

  test('delete a point', async function() {
    const returnedCategory = await poiService.createCategory(newCategory);
    let p = await poiService.createPoint(returnedCategory._id, newPoint);
    assert(p._id != null);
    await poiService.deleteOnePoint(p._id);
    p = await poiService.getPoint(p._id);
    const returnedPoints = await poiService.getCategoryPoints(returnedCategory._id);
    assert(p == null);
    assert.equal(returnedPoints.length, 0);
  });

  test('get all points', async function() {
    const returnedCategory = await poiService.createCategory(newCategory);
    for (let p of points) {
      await poiService.createPoint(returnedCategory._id, p);
    }

    const allPoints = await poiService.getPoints();
    assert.equal(allPoints.length, points.length);
  });

  test('get points detail', async function() {
    const returnedCategory = await poiService.createCategory(newCategory);
    for (let p of points) {
      await poiService.createPoint(returnedCategory._id, p);
    }

    const allPoints = await poiService.getPoints();
    for(var i = 0; i < points.length; i++) {
      assert(_.some([allPoints[i]], points[i]), 'returnedPoint must be a superset of newPoint');
    }
  });

  test('get all points empty', async function() {
    const allPoints = await poiService.getPoints();
    assert.equal(allPoints.length, 0);
  });

  test('creat a point and check addedBy', async function () {
    const returnedCategory = await poiService.createCategory(newCategory);
    await poiService.createPoint(returnedCategory._id, points[0]);
    const returnedPoints = await poiService.getCategoryPoints(returnedCategory._id);
    assert.isDefined(returnedPoints[0].addedBy);

    const users = await poiService.getUsers();
    assert(_.some([users[0]], newUser), 'returnedUser must be a superset of newUser');
  })

});