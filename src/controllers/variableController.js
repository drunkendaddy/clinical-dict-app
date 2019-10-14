const boom = require('boom');
const Variable = require('../models/Variable');

// get all variables
exports.getVariables = async (req, res) => {
  try {
    return await Variable.find();
  } catch (e) {
    throw boom.boomify(e);
  }
};

// get single variable by ID
exports.getVariable = async (req, res) => {
  try {
    const id = req.params.id;
    return await Variable.findById(id);
  } catch (e) {
    throw boom.boomify(e);
  }
};

// add a variable
exports.saveVariable = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      throw boom.badRequest('Only an admin is allowed to perform this action.');
    }
    if (!req.body._id) {
      delete req.body._id;
    }
    const variable = new Variable(req.body);
    return await Variable.create(variable);
  } catch (e) {
    console.log(e);
    throw boom.boomify(e);
  }
};

// update existing variable
exports.updateVariable = async (req, res) => {
  try {
    if (req.user.role === 'VIEWER') {
      throw boom.badRequest('You do not have permission to perform this action.');
    }
    const id = req.params.id;
    const {...updateData} = req.body;
    return await Variable.findByIdAndUpdate(id, updateData, {new: true});
  } catch (e) {
    throw boom.boomify(e);
  }
};

// delete a variable
exports.deleteVariable = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      throw boom.badRequest('Only an admin is allowed to perform this action.');
    }
    return await Variable.findByIdAndRemove(req.params.id);
  } catch (e) {
    throw boom.boomify(e);
  }
};

