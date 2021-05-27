const userController = require('../controllers/userController')
const express = require('express');

// routes
const userRoutes = express.Router()

userRoutes.post('/signup', userController.signup)
userRoutes.post('/login', userController.login)
userRoutes.get('/verify', userController.verify)

module.exports = userRoutes;