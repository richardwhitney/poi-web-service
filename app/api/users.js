'use strict';

const Boom = require('boom');
const User = require('../models/user');
const utils = require('./utils');

const Users = {

  find: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const users = await User.find();
      return users;
    }
  },

  findOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const user = await User.findOne({ _id: request.params.id });
        if (!user) {
          return Boom.notFound('No User with this id');
        }
        return user;
      } catch (e) {
        return Boom.notFound('No User with this id');
      }
    }
  },

  findCurrent: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const userId = utils.getUserIdFromRequest(request);
        const currentUser = await User.findOne({ _id: userId });
        if (!currentUser) {
          return Boom.notFound('No User with this id');
        }
        return currentUser;
      } catch (e) {
        return Boom.notFound('No User with this id');
      }
    }
  },

  create: {
    auth: false,
    handler: async function(request, h) {
      const newUser = new User(request.payload);
      const user = await newUser.save();
      if (user) {
        return h.response(user).code(201);
      }
      return Boom.badImplementation('error creating user');
    }
  },

  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await User.deleteMany({});
      return { success: true };
    }
  },

  deleteOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const user = await User.deleteOne({ _id: request.params.id });
      if (user) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  },

  authenticate: {
    auth: false,
    handler: async function(request, h) {
      console.log('authenticate called.');
      try {
        const user = await User.findOne({ email: request.payload.email });
        if (!user) {
          return Boom.notFound('Authentication failed. User not found');
        }
        const token = utils.createToken(user);
        return h.response({ success: true, token: token }).code(201);
      } catch (e) {
        return Boom.notFound('internal db failure');
      }
    }
  }
};

module.exports = Users;