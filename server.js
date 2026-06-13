const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const db = {
  services: require('./services.json').services,
  favorites: require('./favorites.json').favorites,
  cart: require('./cart.json').cart,
  users: require('./users.json').users,
  orders: require('./orders.json').orders,
  feedback: require('./feedback.json').feedback
};

const router = jsonServer.router(db);
server.use(router);

server.listen(3001, () => {
  console.log('🚀 JSON Server запущен!');
  console.log('http://localhost:3001/services');
  console.log('http://localhost:3001/users');
  console.log('http://localhost:3001/orders');
  console.log('http://localhost:3001/feedback');
  console.log('http://localhost:3001/cart');
  console.log('http://localhost:3001/favorites');
});