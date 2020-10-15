const routes = require('express').Router();

const UserController = require('../app/controllers/UserController');
const CompanyController = require('../app/controllers/CompanyController');
const CompanyCategoryController = require('../app/controllers/CompanyCategoryController');

const authMiddleware = require('../app/middlewares/auth');

routes.post('/user/register', UserController.register);
routes.post('/user/authenticate', UserController.authenticate);

routes.post('/company/register', CompanyController.register);
routes.post('/company/authenticate', CompanyController.authenticate);

// Authenticated routes
routes.use(authMiddleware);

routes.get('/companies', CompanyController.findAll);
routes.get('/companies/:id', CompanyController.findById);

routes.post('/company-categories', CompanyCategoryController.create);
routes.get('/company-categories', CompanyCategoryController.findAll);
routes.get('/company-categories/:id', CompanyCategoryController.findById);
routes.delete('/company-categories/:id', CompanyCategoryController.delete);

module.exports = routes;
