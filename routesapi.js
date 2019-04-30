const PointsApi = require('./app/api/points');

module.exports = [
  { method: 'GET', path: '/api/points', config: PointsApi.find },
  { method: 'GET', path: '/api/points/{id}', config: PointsApi.findOne },
  { method: 'POST', path: '/api/points', config: PointsApi.create },
  { method: 'DELETE', path: '/api/points/{id}', config: PointsApi.deleteOne },
  { method: 'DELETE', path: '/api/points', config: PointsApi.deleteAll }
];