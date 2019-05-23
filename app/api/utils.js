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