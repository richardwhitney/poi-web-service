'use strict';

const axios = require('axios');
const baseUrl = 'http://DESKTOP-EA6LDA6:3000';

class PoiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getCategories() {
    const response = await axios.get(this.baseUrl + '/api/categories');
    return response.data;
  }

  async getCategory(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/categories/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createCategory(newCategory) {
    const response = await axios.post(this.baseUrl + '/api/categories', newCategory);
    return response.data;
  }

  async getCategoryPoints(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/categories/' + id + '/points');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllCategories() {
    const response = await axios.delete(this.baseUrl + '/api/categories');
    return response.data;
  }

  async deleteOneCategory(id) {
    const response = await axios.delete(this.baseUrl + '/api/categories/' + id);
    return response.data;
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

  async createPoint(id, newPoint) {
    try {
      const response = await axios.post(this.baseUrl + '/api/categories/' + id + '/points', newPoint);
      return response.data;
    } catch (e) {
      return null;
    }
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
    try {
      const response = await axios.get(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + '/api/users', newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

}

module.exports = PoiService;