const nutritionController = require('../controllers/nutritionController')
const express = require('express');

// routes
const nutritionRoutes = express.Router()

nutritionRoutes.get('/', nutritionController.getDay)
nutritionRoutes.post('/', nutritionController.saveDay)
nutritionRoutes.get('/all', nutritionController.getUsersNutrition)

module.exports = nutritionRoutes;