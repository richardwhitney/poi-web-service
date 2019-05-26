'use strict';

const Category = require('../models/category');
const Boom = require('boom');

const Categories = {

  find: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const categories = await Category.find().populate('points');
      for (let category of categories) {
        console.log(category.name + ' point list length: ' + category.points);
      }
      return categories;
    }
  },

  findOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const category = await Category.findOne({ _id: request.params.id }).populate('points');
        console.log('Category point list length: ' + category.points.lenght);
        if (!category) {
          return Boom.badImplementation('No category with this id');
        }
        return category;
      } catch (e) {
        return Boom.notFound('No category with this id');
      }
    }
  },

  findPoints: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const category = await Category.findOne({ _id: request.params.id }).populate('points');
        console.log('Category point list length: ' + category.points.lenght);
        if (!category) {
          return Boom.badImplementation('No category with this id');
        }
        return category.points;
      } catch (e) {
        return Boom.notFound('No category with this id');
      }
    }
  },

  create: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const newCategory = new Category(request.payload);
      const category = await newCategory.save();
      if (category) {
        return h.response(category).code(201);
      }
      return Boom.badImplementation('error creating category');
    }
  },

  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await Category.remove({});
      return { success: true };
    }
  },

  /*deleteCategoryPoint: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const point = await
    }
  }*/

  deleteOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const response = await Category.deleteOne({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  }
};

module.exports = Categories;