'use strict';

const axios = require('axios');
const baseUrl = 'http://DESKTOP-EA6LDA6:3000';

class PoiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getPoints() {
    const response = await axios.get(this.baseUrl + '/api/points');
    return response.data;
  }

  async getPoint(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/points/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createPoint(newPoint) {
    const response = await axios.post(this.baseUrl + '/api/points', newPoint);
    return response.data;
  }

  async deleteAllPoints() {
    const response = await axios.delete(this.baseUrl + '/api/points');
    return response.data;
  }

  async deleteOnePoint(id) {
    const response = await axios.delete(this.baseUrl + '/api/points/' + id);
    return response.data;
  }

  async getUsers() {
    const response = await axios.get(this.baseUrl + '/api/users');
    return response.data;
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/user/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    const response = await axios.post(this.baseUrl + '/api/users', newUser);
    return response.data;
  }
}

module.exports = PoiService;