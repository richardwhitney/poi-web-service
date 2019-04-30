'use strict';

const Point = require('../models/poi');

const Points = {

  find: {
    auth: false,
    handler: async function(request, h) {
      const points = await Point.find();
      return points;
    }
  },
};

module.exports = Points;