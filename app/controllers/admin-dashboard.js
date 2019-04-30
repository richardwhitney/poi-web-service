'use strict';
const User = require('../models/user');

const AdminDashboard = {
  home: {
    handler: async function (request, h) {
      try {
        const users = await User.find();
        return h.view('admin-dashboard', {
          title: 'Admin Dashboard',
          users: users
        });
      } catch (e) {
        return h.view('main', { errors:[{ message: e.message}]});
      }
    }
  },
  deleteUser: {
    handler: async function (request, h) {
      try {
        User.findByIdAndRemove(request.params.id, function (err) {
          if (err) {
            console.log('Error: Point not deleted');
          }
          else {
            console.log('Success: User deleted ' + request.params.id);
          }
        });
        return h.redirect('/adminhome');
      } catch (e) {
        return h.view('main', { errors:[{ message: e.message}]});
      }
    }
  }
}

module.exports = AdminDashboard;