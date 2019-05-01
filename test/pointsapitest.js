'use strict';

const assert = require('chai').assert;
const _ = require('lodash');
const PoiService = require('./poi-service');
const fixtures = require('./fixtures');

suite('Point API test', function() {

  let points = fixtures.points;
  let newPoint = fixtures.newPoint;

  const poiService = new PoiService('http://DESKTOP-EA6LDA6:3000');

  setup(async function () {
    await poiService.deleteAllPoints();
  });

  teardown(async function () {
    await poiService.deleteAllPoints();
  });

  test('create a point', async function() {
    const returnedPoint = await poiService.createPoint(newPoint);
    assert(_.some([returnedPoint], newPoint), 'returnedPoint must be a superset of newPoint');
    assert.isDefined(returnedPoint._id);
  });

  test('get point', async function() {
    const p1 = await poiService.createPoint(newPoint);
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
    let p = await poiService.createPoint(newPoint);
    assert(p._id != null);
    await poiService.deleteOnePoint(p._id);
    p = await poiService.getPoint(p._id);
    assert(p == null);
  });

  test('get all points', async function() {
    for (let p of points) {
      await poiService.createPoint(p);
    }

    const allPoints = await poiService.getPoints();
    assert.equal(allPoints.length, points.length);
  });

  test('get points detail', async function() {
    for (let p of points) {
      await poiService.createPoint(p);
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

});