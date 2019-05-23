const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createToken = function (user) {
  return jwt.sign({ id: user._id, email: user.email }, 'secretpassworddontrevealtoanyone', {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
};

exports.decodeToken = function (token) {
  let userInfo = {};
  try {
    var decoded = jwt.verify(token, 'secretpassworddontrevealtoanyone');
    userInfo.userId = decoded.id;
    userInfo.email = decoded.email;
    console.log('User id: ' + userInfo.userId + ', User email: ' + userInfo.email);
  } catch (e) {

  }
  return userInfo;
};

exports.validate = async function (decoded, request) {
  const user = await User.findOne({ _id: decoded.id });
  if (!user) {
    return { isValid: true };
  }
  else {
    return { isValid: true };
  }
};

exports.getUserIdFromRequest = function (request) {
  let userId = null;
  console.log('User id from request called');
  try {
    const authorization = request.headers.authorization;
    var token = authorization.split(' ')[1];
    let decodedToken = jwt.verify(token, 'secretpassworddontrevealtoanyone');
    userId = decodedToken.id;
    console.log('User id from token: ' + userId);
  } catch (e) {
    userId = null;
  }
  return userId;
};