'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  description: String,
  imageUrl: String,
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Mongoose.model('PointOfInterest', poiSchema);