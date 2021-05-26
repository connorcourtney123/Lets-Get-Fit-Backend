const achievementController = require('../controllers/achievementController')
const express = require('express');

// routes
const achievementRoutes = express.Router()

achievementRoutes.get('/completed', achievementController.getCompleted)
achievementRoutes.get('/incompleted', achievementController.getIncompleted)
achievementRoutes.post('/', achievementController.markComplete)

module.exports = achievementRoutes;