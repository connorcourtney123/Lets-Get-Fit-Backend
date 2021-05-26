const workoutController = require('../controllers/workoutController')
const express = require('express');

// routes
const workoutRoutes = express.Router()

workoutRoutes.post('/', workoutController.createWorkout)
workoutRoutes.get('/', workoutController.getUsersWorkouts)


module.exports = workoutRoutes;