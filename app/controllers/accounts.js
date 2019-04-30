'use strict';

const User = require('../models/user');
const Admin = require('../models/admin');
const Category = require('../models/category');
const Boom = require('boom');
const Joi = require('joi');
const os = require('os');

const Accounts = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view('main', {title: 'Welcome to Islands of Ireland'});
    }
  },
  showTest: {
    auth: false,
    handler: function (request, h) {
      console.log('Server: ' + os.hostname());
      return h.view('test', { test: 'Server: ' + os.hostname()});
    }
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view('signup', { title: 'Sign up to IoI'});
    }
  },
  signup: {
    auth: false,
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: function (request, h, error) {
        return h.view('signup', {
          title: 'Sign up error',
          errors: error.details
        })
          .takeover().code(400);
      }
    },
    handler: async function (request, h) {
      try {
        const payload = request.payload;
        let user = await User.findByEmail(payload.email);
        if (user) {
          const message = 'Email address is already registered';
          throw new Boom(message);
        }
        const newUser = new User({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: payload.password
        });
        user = await newUser.save();
        request.cookieAuth.set({ id: user.id });
        return h.redirect('/home');
      } catch (e) {
        return h.view('signup', { errors:[{ message: e.message}]});
      }
    }
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view('login', { title: 'Login to IoI'});
    }
  },
  login: {
    auth: false,
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: function (request, h, error) {
        return h.view('login', {
          title: 'Sign in error',
          errors: error.details
        }).takeover().code(400);
      }
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email)
        let admin = await Admin.findByEmail(email);
        if (user) {
          user.comparePassword(password);
          request.cookieAuth.set({ id: user.id });
          return h.redirect('/home');
        }
        else if (admin) {
          admin.comparePassword(password);
          request.cookieAuth.set({ id: admin.id });
          return h.redirect('/adminhome');
        }
        else {
          const message = 'Email address is not registered';
          throw new Boom(message);
        }
      } catch (e) {
        return h.view('login', { errors: [{ message: e.message}]});
      }
    }
  },
  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect('/');
    }
  },
  showSettings: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const categories = await Category.find().populate('points');
        return h.view('settings',
          { title: 'IoI Settings',
            user: user,
            categories: categories
          });
      } catch (e) {
        return h.view('login', { errors:[{ message: e.message}]});
      }
    }
  },
  updateSettings: {
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        passowrd: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: function (request, h, error) {
        return h.view('settings', {
          title: 'Update settings error',
          errors: error.details
        }).takeover().code(400);
      }
    },
    handler: async function (request, h) {
      try {
        const userEdit = request.payload;
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        user.firstName = userEdit.firstName;
        user.lastName = userEdit.lastName;
        user.email = userEdit.email;
        user.password = userEdit.password;
        await user.save();
        return h.redirect('/settings');
      } catch (e) {
        return h.view('main', { errors:[{ message: e.message}]});
      }
    }
  },
};

module.exports = Accounts;