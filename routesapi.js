const CategoriesApi = require('./app/api/categories');
const PointsApi = require('./app/api/points');
const UsersApi = require('./app/api/users');

module.exports = [
  { method: 'GET', path: '/api/categories', config: CategoriesApi.find },
  { method: 'GET', path: '/api/categories/{id}', config: CategoriesApi.findOne },
  { method: 'POST', path: '/api/categories', config: CategoriesApi.create },
  { method: 'DELETE', path: '/api/categories/{id}', config: CategoriesApi.deleteOne },
  { method: 'DELETE', path: '/api/categories', config: CategoriesApi.deleteAll },

  { method: 'GET', path: '/api/categories/{id}/points', config: CategoriesApi.findPoints },
  { method: 'POST', path: '/api/categories/{id}/points', config: PointsApi.create },

  { method: 'GET', path: '/api/points', config: PointsApi.find },
  { method: 'GET', path: '/api/points/{id}', config: PointsApi.findOne },
  { method: 'POST', path: '/api/points', config: PointsApi.create },
  { method: 'DELETE', path: '/api/points/{id}', config: PointsApi.deleteOne },
  { method: 'DELETE', path: '/api/points', config: PointsApi.deleteAll },

  { method: 'GET', path: '/api/users', config: UsersApi.find },
  { method: 'GET', path: '/api/users/{id}', config: UsersApi.findOne },
  { method: 'POST', path: '/api/users', config: UsersApi.create },
  { method: 'DELETE', path: '/api/users/{id}', config: UsersApi.deleteOne },
  { method: 'DELETE', path: '/api/users', config: UsersApi.deleteAll },
  { method: 'POST', path: '/api/users/authenticate', config: UsersApi.authenticate }
];