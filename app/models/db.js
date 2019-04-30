'use strict';

const dotenv = require('dotenv');

const result = dotenv.config();

if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const Mongoose = require('mongoose');

Mongoose.connect(process.env.db);
const db = Mongoose.connection;

async function seed() {
  var seeder = require('mais-mongoose-seeder')(Mongoose);
  const data = require('./initdata');
  const Category = require('./category');
  const PointOfInterest = require('./poi');
  const User = require('./user');
  const dbData = await seeder.seed(data, { dropDatabase: false, dropCollections: true});
  const catagories = await Category.find();
  const points = await PointOfInterest.find();
  var cIndex, pIndex;
  for (cIndex = 0; cIndex < catagories.length; ++cIndex) {
    for (pIndex = 0; pIndex < points.length; ++pIndex) {
      if (JSON.stringify(catagories[cIndex]._id) === JSON.stringify(points[pIndex].category)) {
        console.log('================Point found================');
        catagories[cIndex].points.push(points[pIndex]);
        await catagories[cIndex].save();
      }
    }
  }
  console.log(dbData);
}

db.on('error', function (err) {
  console.log(`database connection error: ${err}`);
});

db.on('disconnect', function () {
  console.log('database disconnected');
});

db.once('open', function () {
  console.log(`database connected to ${this.name} on ${this.host}`);
  seed();
});