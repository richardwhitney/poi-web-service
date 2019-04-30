'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  description: String,
  imageUrl: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Mongoose.model('PointOfInterest', poiSchema);