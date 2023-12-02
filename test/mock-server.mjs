// Import the framework and instantiate it
import Fastify from 'fastify';
const fastify = Fastify({
  logger: false
});

// Declare a route
fastify.get('/ping', async function handler(request, reply) {
  return { pong: 'hello world !' };
});

fastify.post('/ping', async function handler(request, reply) {
  return { ...request.body };
});
fastify.get('/auth', async function handler(request, reply) {
  const authorization = request.headers.authorization;
  return { authorization };
});
fastify.post('/formatter', async function handler(request, reply) {
  return { code: 200, data: request.body, msg: 'success' };
});

const startServer = async () => {
  try {
    await fastify.listen({ port: 3303 });
  } catch (err) {
    fastify.log.error(err);
  }
};
const closeServer = async () => {
  fastify.close();
};

// startServer();

export {
  startServer,
  closeServer
};