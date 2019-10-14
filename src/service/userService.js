// External Dependancies
const BCrypt = require('bcrypt');

// Internal Dependencies
const userDao = require('../repo/userDao');
const boom = require('boom');
const User = require('../models/User');

exports.createUser = async (user) => {
  // Check if email exists
  let existingUser = await userDao.findByUsername(user.username);
  if (existingUser && existingUser.username === user.username) {
    throw boom.badRequest('User with username already exists.');
  }
  // BCrypt password
  user.password = BCrypt.hashSync(user.password, 10);
  return await userDao.createUser(user);
};

exports.login = async (email, password) => {
  console.log("Attempting login with email address %s", email);
  let user = await userDao.findByUsername(email);
  if (!user) {
    throw boom.badRequest('User does not exists');
  }
  if (!BCrypt.compareSync(password, user.password)) {
    throw boom.badRequest('Username and password does not match.');
  }
  return user;
};

exports.getUserByUsername = async (username) => {
  let user = await userDao.findByUsername(username);
  if (!user) {
    throw 'User does not exists';
  }
  return user;
};

exports.findAll = async () => {
  return await userDao.findAll();
};

exports.updateUserRole = async (user) => {
  let entity = await userDao.findByUsername(user.username);
  if (!entity) {
    throw boom.badRequest('User does not exists');
  }
  entity.role = user.role;
  return await userDao.updateUser(user);
};

exports.createAdmin = async () => {
  let count = await userDao.countAll();
  if (count || count > 0)
    return;
  const user = new User({
    name: "John Wick",
    username: "admin",
    password: "admin",
    role: 'ADMIN'
  });
  user.password = BCrypt.hashSync(user.password, 10);
  return await userDao.createUser(user);
};