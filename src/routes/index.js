// Import our Controllers
const variableController = require('../controllers/variableController');
const userController = require('../controllers/userController');

const routes = [
  {
    method: 'POST',
    url: '/api/login',
    handler: userController.login
  },
  {
    method: 'POST',
    url: '/api/register',
    handler: userController.signUp
  },
  {
    method: 'GET',
    url: '/api/users',
    handler: userController.allUsers
  },
  {
    method: 'PUT',
    url: '/api/users/role',
    handler: userController.updateRole
  },
  {
    method: 'GET',
    url: '/api/variables',
    handler: variableController.getVariables
  },
  {
    method: 'GET',
    url: '/api/variables/:id',
    handler: variableController.getVariable
  },
  {
    method: 'POST',
    url: '/api/variables',
    handler: variableController.saveVariable
  },
  {
    method: 'PUT',
    url: '/api/variables/:id',
    handler: variableController.updateVariable
  },
  {
    method: 'DELETE',
    url: '/api/variables/:id',
    handler: variableController.deleteVariable
  }
];

module.exports = routes;