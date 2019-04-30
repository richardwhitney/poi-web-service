const Accounts = require('./app/controllers/accounts');
const Dashboard = require('./app/controllers/dashboard');
const AdminDashboard = require('./app/controllers/admin-dashboard')
const PointOfInterestController = require('./app/controllers/pointofinterest');
const Category = require('./app/controllers/category-controller');
const os = require('os');

module.exports = [
  { method: 'GET', path: '/', config: Accounts.index},
  { method: 'GET', path: '/signup', config: Accounts.showSignup},
  { method: 'GET', path: '/login', config: Accounts.showLogin},
  { method: 'GET', path: '/logout', config: Accounts.logout},
  { method: 'POST', path: '/signup', config: Accounts.signup},
  { method: 'POST', path: '/login', config: Accounts.login},
  { method: 'GET', path: '/settings', config: Accounts.showSettings},
  { method: 'POST', path: '/settings', config: Accounts.updateSettings},

  { method: 'GET', path: '/home', config: Dashboard.home},
  { method: 'POST', path: '/addpoint', config: Dashboard.addPointOfInterest},
  { method: 'GET', path: '/poi/{id}', config: Dashboard.pointDetails},

  { method: 'GET', path: '/adminhome', config: AdminDashboard.home},
  { method: 'GET', path: '/adminhome/deleteuser/{id}', config: AdminDashboard.deleteUser},

  { method: 'POST', path: '/poi/addPhoto/{id}', config: PointOfInterestController.addPhoto},
  { method: 'GET', path: '/poi/deletePoint/{id}', config: PointOfInterestController.deletePoint},
  { method: 'GET', path: '/updatepoi/{id}', config: PointOfInterestController.showPointSettings},
  { method: 'POST', path: '/poi/updatepoi/{id}', config: PointOfInterestController.updatePoint},

  { method: 'POST', path: '/addcategory', config: Category.addCategory},

  { method: 'GET', path: '/testlb', config: Accounts.showTest},

  { method: 'GET',
    path: '/images/{param*}',
    handler: {
      directory: {
        path: './public/images',
        listing: true
      }
    },
    options: { auth: false }
  }
];