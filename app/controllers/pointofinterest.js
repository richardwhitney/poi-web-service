'use strict';

const PointOfInterest = require('../models/poi');
const Joi = require('joi');
const cloudinary = require('cloudinary');
const Boom = require('boom');
const Catagory = require('../models/category');

if (typeof (process.env.CLOUDINARY_URL) == 'undefined') {
  console.warn('!! cloudinary config is undefined !!');
  console.warn('export CLOUDINARY_URL or set dotenv file');
}
else {
  console.log('cloudinary config:');
  console.log(cloudinary.config());
}

const PointOfInterestController = {
  addPhoto: {
    payload: {
      maxBytes: 209715200,
      output: 'file',
      parse: true,
      allow: 'multipart/form-data'
    },
    handler: async function(request, h) {
      try {
        console.log("Point id: " + request.params.id);
        const point = await PointOfInterest.findById(request.params.id);
        const categories = await Catagory.find().populate('points');
        const data = request.payload.image;
        const filePath = data.path;
        if (data.bytes) {
          await cloudinary.uploader.upload(filePath, async function (result) {
            point.imageUrl = result.secure_url;
            await point.save();
          });
          return h.view('poi', {
            title: 'Explore Island of Ireland',
            point: point,
            categories: categories
          });
        }
        else {
          const message = 'No file chosen';
          return h.view('poi', {
            title: 'Explore Island of Ireland',
            point: point,
            categories: categories,
            errors:[{ message: message}]
          })
        }
      } catch (e) {
        return h.view('main', { errors:[{ message: e.message}]});
      }
    }
  },
  deletePoint: {
    handler: async function(request, h) {
      try {
        PointOfInterest.findByIdAndRemove(request.params.id, function(err) {
          if (err) {
            console.log('Error: Point not deleted');
          }
          else {
            console.log('Success: Point deleted');
          }
        });
        return h.redirect('/home');
      } catch (e) {
        return h.view('main', { errors:[{ message: e.message}]});
      }
    }
  },
  showPointSettings: {
    handler: async function(request, h) {
      try {
        const point = await PointOfInterest.findById(request.params.id).populate('category');
        const categories = await Catagory.find().populate('points');
        return h.view('updatepoi',
          { title: 'Update POI',
            point: point,
            categories: categories
          });
      } catch (e) {
        return h.view('main', { errors:[{ message: e.message}]});
      }
    }
  },
  updatePoint: {
    validate: {
      payload: {
        category: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: async function (request, h, error) {
        const point = await PointOfInterest.findById(request.params.id);
        const categories = await Catagory.find().populate('points');
        return h.view('updatepoi', {
          title: 'Update POI Error',
          point: point,
          categories: categories,
          errors: error.details
        }).takeover().code(400);
      }
    },
    handler: async function(request, h) {
      try {
        const pointEdit = request.payload;
        const point = await PointOfInterest.findById(request.params.id).populate('category');
        const categories = await Catagory.find().populate('points');
        point.name = pointEdit.name;
        point.description = pointEdit.description;
        await point.save();
        return h.view('poi', {
          title: 'Explore Island of Ireland',
          point: point,
          categories: categories
        });
      } catch (e) {
        return h.view('main', { errors:[{ messge: e.message}]});
      }
    }
  }
};

module.exports = PointOfInterestController;