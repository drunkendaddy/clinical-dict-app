const routes = require('./routes');
const fastify = require('fastify')({
  logger: true
});
const jwtAuth = require('./config/jwt');
const userService = require('./service/userService');

fastify.register(require('fastify-boom'));
fastify.register(require('fastify-cors'), {
  // put your options here
  origin: true
});
fastify.register(jwtAuth);
routes.forEach((route, index) => {
  fastify.route(route);
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data-dict')
  .then(() => {
    console.log('MongoDB connected…');
    userService.createAdmin();
  })
  .catch(err => console.log(err));

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info('server listening on ${fastify.server.address().port}');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start().then(() => console.log("server started..."));





