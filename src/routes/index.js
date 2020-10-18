const routes = require('express').Router();
const multer = require('multer');

const upload = multer({
  dest: './temp',
});

const UserController = require('../app/controllers/UserController');
const CompanyController = require('../app/controllers/CompanyController');
const CompanyCategoryController = require('../app/controllers/CompanyCategoryController');
const ProductController = require('../app/controllers/ProductController');
const OrderController = require('../app/controllers/OrderController');
const ProductCategoryController = require('../app/controllers/ProductCategoryController');
const ImageUploadController = require('../app/controllers/ImageUploadController');
const authMiddleware = require('../app/middlewares/auth');

routes.post('/users', UserController.create);
routes.post('/users/authenticate', UserController.authenticate);

routes.post('/companies', CompanyController.create);
routes.post('/companies/authenticate', CompanyController.authenticate);

routes.get('/company-categories', CompanyCategoryController.findAll);

// Authenticated routes
routes.use(authMiddleware);

routes.get('/me/products', ProductController.getProductsPerCompany);
routes.get('/me/orders', OrderController.getOrdersPerCompany);

routes.put('/user/:id', UserController.update);

routes.get('/companies', CompanyController.findAll);
routes.get('/companies/:id', CompanyController.findById);
routes.put('/companies/:id', CompanyController.update);

routes.post('/company-categories', CompanyCategoryController.create);
routes.get('/company-categories/:id', CompanyCategoryController.findById);
routes.delete('/company-categories/:id', CompanyCategoryController.delete);

routes.post('/products', ProductController.create);
routes.get('/products', ProductController.findAll);
routes.get('/products/:id', ProductController.findById);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.post('/product-categories', ProductCategoryController.create);
routes.get('/product-categories', ProductCategoryController.findAll);
routes.get('/product-categories/:id', ProductCategoryController.findById);
routes.delete('/product-categories/:id', ProductCategoryController.delete);

routes.post('/products', ProductController.create);
routes.get('/products', ProductController.findAll);
routes.get('/products/:id', ProductController.findById);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.post('/orders', OrderController.create);
routes.get('/orders', OrderController.findAll);
routes.get('/orders/:id', OrderController.findById);
routes.put('/orders/:id/status', OrderController.updateStatus);

routes.post(
  '/upload/company',
  upload.single('image'),
  ImageUploadController.uploadCompanyImage,
);

routes.post(
  '/upload/user',
  upload.single('image'),
  ImageUploadController.uploadUserImage,
);

routes.post(
  '/upload/product',
  upload.single('image'),
  ImageUploadController.uploadProductImage,
);

module.exports = routes;
