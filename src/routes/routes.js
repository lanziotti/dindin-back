const express = require('express');
const { login } = require('../controllers/login');
const { userRegistration } = require('../controllers/users');

const routes = express();

routes.post('/usuario', userRegistration);
routes.post('/login', login);

module.exports = routes;