const nutritionController = require('../controllers/nutritionController')
const express = require('express');

// routes
const nutritionRoutes = express.Router()

nutritionRoutes.post('/', nutritionController.getDay)
nutritionRoutes.post('/save', nutritionController.saveDay)
nutritionRoutes.get('/all', nutritionController.getUsersNutrition)

module.exports = nutritionRoutes;