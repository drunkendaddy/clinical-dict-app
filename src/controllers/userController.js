const boom = require('boom');
const User = require('../models/User');
const userService = require('../service/userService');

// Signup controller method
exports.signUp = async (request, reply) => {
  try {
    const user = new User(request.body);
    userService.createUser(user).then(user => {
      return reply
        .code(200)
        .send({
          "username": user.username,
          "name": user.name,
        });
    }, err => {
      return reply
        .code(500)
        .send({"message": err});
    });
  } catch (err) {
    throw boom.boomify(new Error(err));
  }
};

// Login controller method
exports.login = async (request, reply) => {
  try {
    const {username, password} = request.body;
    let user = await userService.login(username, password);
    const token = await reply.jwtSign({
      "username": user.username,
      "role": user.role
    });
    return reply
      .code(200)
      .send({
        "token": token,
        "username": user.username,
        "name": user.name,
        "role": user.role,
      });
  } catch (err) {
    throw boom.boomify(err); // this will set the status to 400
  }
};

// User me method
exports.me = async (request, reply) => {
  try {
    const username = request.user.username;
    let user = await userService.getUserByUsername(username);
    return reply
      .code(200)
      .send({
        "username": user.username,
        "name": user.name,
        "role": user.role,
      });
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.allUsers = async (request, reply) => {
  try {
    let users = await userService.findAll();
    return reply
      .code(200)
      .send(users);
  } catch (err) {
    console.log(err);
    throw boom.boomify(err);
  }
};

exports.updateRole = async (req, reply) => {
  console.log('allUsers');
  try {
    const user = new User(req.body);
    let var1 = await userService.updateUserRole(user);
    return reply
      .code(200)
      .send(var1);
  } catch (err) {
    console.log(err);
    throw boom.boomify(err);
  }
};