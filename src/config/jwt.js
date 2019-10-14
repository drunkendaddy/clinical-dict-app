const fp = require("fastify-plugin");
const JWT = require('fastify-jwt');

const config = {
  jwt: {
    secret: "bcuwkab2378fg27idbyF58RZ7I6gyutyfzi76IGI8GUTZF5r767T6FTYcaw8374g",
    algorithm: 'HS256',
    expiresIn: '30 days'
  },
  exclude: ['/api/register', '/api/login']
};

const jwtAuth = fp(async (fastify, opts) => {

  await fastify.register(JWT, {
    secret: config.jwt.secret,
    sign: {
      algorithm: config.jwt.algorithm,
      expiresIn: config.jwt.expiresIn
    }
  });

  fastify.addHook("onRequest", async (request, reply) => {
    try {
      const requestUrl = request.req.originalUrl;
      if (!isMatch(requestUrl)) {
        await request.jwtVerify();
      }
    } catch (err) {
      reply.send(err);
    }
  });
  
});

const isMatch = (url) => {
  return config.exclude.some((urlPattern, index) => {
    return url === urlPattern;
  });
};

module.exports = jwtAuth;