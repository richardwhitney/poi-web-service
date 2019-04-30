'use strict';

const assert = require('chai').assert;
const axios = require('axios');

suite('Point API test', function() {

  test('get points', async function() {
    const response = await axios.get('http://DESKTOP-EA6LDA6:3000/api/points');
    const points = response.data;
    assert.equal(10, points.length);

    assert.equal(points[0].name, 'Island More');
  });

  test('get one point', async function() {
    let response = await axios.get('http://DESKTOP-EA6LDA6:3000/api/points');
    const points = response.data;
    assert.equal(10, points.length);

    const onePointUrl = 'http://DESKTOP-EA6LDA6:3000/api/points/' + points[0]._id;
    response = await axios.get(onePointUrl);
    const onePoint = response.data;

    assert.equal(onePoint.name, 'Island More');
    assert.equal(onePoint.description, 'This is a conglomeration of a number of islands very connected, including Rabbit Island to the NW, Knocky Cahillaun and Freaghillan to the NE, and mighty Clynish to the E. The centre is at the gap with Knocky Cahillaun where there are half a dozen houses. A laneway though the gap is an important thoroughfare hereabouts, certainly a significant portage in an area where these things matter. The houses are well appointed, money no object. The ridge walking either side of the gap is gorgeous. Rabbit L902-897 is also joined to Inishbee / Derinish, and nowadays is an absentee cattle ranch. There is also a posh quay / pontoon on the spit joining to Quinnsheen Island at about L909-891. Most remarkable is the fine path created from the pontoon to the nearest house, across unstable storm beach. The house is old, with old vegetation, there a long time. Even more so, view the Steamship wrecked in Island More Harbour, called the Charles Stewart Parnell. She caught fire while at anchor there, and was lost with no casualties. She is famous for the enormous lobster living in her boiler, who has been trapped there the last 30+ years, as it grew too big to escape!')
    assert.equal(onePoint.imageUrl, 'https://res.cloudinary.com/dgbpagu5n/image/upload/v1551137682/fchlykejmf7mltor6du1.jpg')
  })

  test('create a point', async function() {
    const pointsUrl = 'http://DESKTOP-EA6LDA6:3000/api/points';
    const newPoint = {
      name: 'Test Point',
      description: 'This is a test',
      imageUrl: 'https://res.cloudinary.com/dgbpagu5n/image/upload/v1551137682/fchlykejmf7mltor6du1.jpg'
    };

    const response = await axios.post(pointsUrl, newPoint);
    const returnedPoint = response.data;
    assert.equal(201, response.status);

    assert.equal(returnedPoint.name, 'Test Point');
    assert.equal(returnedPoint.description, 'This is a test');
    assert.equal(returnedPoint.imageUrl, 'https://res.cloudinary.com/dgbpagu5n/image/upload/v1551137682/fchlykejmf7mltor6du1.jpg');
  })
});