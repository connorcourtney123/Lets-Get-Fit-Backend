// grab models
const models = require('../models');

// data encryption
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// controller obj
const workoutController = {};

// signup
workoutController.createWorkout = async (req, res) =>{
    try{
        
       //decrypt id
       const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

        if(req.body.type=='cardio'){

            const newCardio = await models.cardio.create({
                userId: decryptedId.userId,
                rating: req.body.rating,
                distance: req.body.distance,
                time: req.body.time,
                name: req.body.name,
                date: req.body.date
            })

            res.json({message: 'cardio workout saved', workout: newCardio})

        }else if(req.body.type=='strength'){

            const newStrength = await models.strength.create({
                userId: decryptedId.userId,
                rating: req.body.rating,
                weight: req.body.weight,
                reps: req.body.reps,
                sets: req.body.sets,
                name: req.body.name,
                date: req.body.date
            })

            res.json({message: 'strength workout saved', workout: newStrength})

        }

    }catch(error){
        console.log(error)
        res.json({error})
    }
}

//get all user's workouts
workoutController.getUsersWorkouts = async (req, res) =>{
    try{
        //decrypt id
       const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
       //get user
       const user = await models.user.findOne({ where: { id: decryptedId.userId}});

        const cardios = await user.getCardios();
        const strengths = await user.getStrengths();

        res.json({cardios: cardios, strengths: strengths})

    }catch(error){
        console.log(error)
    }
}

module.exports = workoutController;