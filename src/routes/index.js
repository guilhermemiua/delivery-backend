const routes = require('express').Router();

const UserController = require('../app/controllers/UserController');
const CompanyController = require('../app/controllers/CompanyController');

const authMiddleware = require('../app/middlewares/auth');

routes.post('/user/register', UserController.register);
routes.post('/user/authenticate', UserController.authenticate);

routes.post('/company/register', CompanyController.register);
routes.post('/company/authenticate', CompanyController.authenticate);

// Authenticated routes
routes.use(authMiddleware);

routes.get('/users', UserController.findAll);

routes.get('/companies', CompanyController.findAll);
routes.get('/companies/:id', CompanyController.findById);

module.exports = routes;
