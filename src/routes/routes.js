const express = require('express');
const { listCategories } = require('../controllers/categories');
const { login } = require('../controllers/login');
const { registerTransaction } = require('../controllers/transactions');
const { userRegistration, getUserProfile, updateUserProfile } = require('../controllers/users');
const { authenticationFilter } = require('../middlewares/authentication');

const routes = express();

routes.post('/usuario', userRegistration);
routes.post('/login', login);

routes.use(authenticationFilter);

routes.get('/usuario', getUserProfile);
routes.put('/usuario', updateUserProfile);
routes.get('/categoria', listCategories);
routes.post('/transacao', registerTransaction);

module.exports = routes;