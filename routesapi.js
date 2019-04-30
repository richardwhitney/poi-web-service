const Points = require('./app/api/points');

module.exports = [
  { method: 'GET', path: '/api/points', config: Points.find }
];