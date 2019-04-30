'use strict';

const Category = require('../models/category');
const Boom = require('boom');

const CategoryController = {
  addCategory: {
    handler: async function(request, h) {
      try {
        const data = request.payload;
        if (data.name) {
          const newCategory = new Category({
            name: data.name
          });
          await newCategory.save();
        }
        return h.redirect('/home');
      } catch (e) {
        return h.view('main', {errors:[{ message: e.message}]});
      }
    }
  }
}

module.exports = CategoryController;