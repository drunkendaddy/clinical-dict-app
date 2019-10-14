// Internal Dependencies
const User = require('../models/User')

exports.createUser = async (user) => {
  return User.create(user);
};

exports.findByUsername = async (username) => {
  return User.findOne({'username': username});
};

exports.findById = async (userId) => {
  return User.findById(userId);
};

exports.updateUser = async (user) => {
  return await User.updateOne({'_id': user._id}, user);
};

exports.findAll = async () => {
  return await User.find();
};

exports.countAll = async () => {
  return await User.count();
};