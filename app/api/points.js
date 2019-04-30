'use strict';

const Point = require('../models/poi');
const Boom = require('boom');

const Points = {

  find: {
    auth: false,
    handler: async function(request, h) {
      const points = await Point.find();
      return points;
    }
  },

  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const point = await Point.findOne({ _id: request.params.id });
        if (!point) {
          return Boom.notFound('No point with this id');
        }
        return point;
      } catch (e) {
        return Boom.notFound('No point with this id');
      }
    }
  }
};

module.exports = Points;