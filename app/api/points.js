'use strict';

const Point = require('../models/poi');
const Category = require('../models/category');
const Boom = require('boom');

const Points = {

  find: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const points = await Point.find();
      return points;
    }
  },

  findOne: {
    auth: {
      strategy: 'jwt',
    },
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
  },

  findByCategory: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const points = await Point.find({ category: request.params.id });
        return points;
      } catch (e) {
        return Boom.notFound('No point with this category id');
      }
    }
  },

  create: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        let newPoint = new Point(request.payload);
        let newCategory = await Category.findOne({ _id: request.params.id });
        if (!newCategory) {
          return Boom.notFound('No category with this id');
        }
        const point = await newPoint.save();
        if (point) {
          console.log('Category length: ' + newCategory.points.length);
        }
        await newCategory.points.push(point._id);
        await newCategory.save();
        if (point) {
          return h.response(point).code(201);
        }
      } catch (e) {
        return Boom.badImplementation('error creating point');
      }
    }
  },

  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await Point.remove({});
      return { success: true };
    }
  },

  deleteOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const response = await Point.deleteOne({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  }
};

module.exports = Points;