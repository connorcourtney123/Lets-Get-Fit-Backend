//grab models
const models = require('../models');

// data encryption
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// controller obj
const achievementController = {};

// get all achievements completes by the user
achievementController.getCompleted = async (req, res) => {
    try{
        //decrypt id
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        //get user
        const user = await models.user.findOne({ where: { id: decryptedId.userId}});

        const achs = await user.getAchievements()

        res.json({completed: achs})

    }catch(error){
        console.log(error)
        res.json({error})
    }
}

//get all achs not yet completed by the user
achievementController.getIncompleted = async (req, res) => {
    try{
        //decrypt id
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        //get user
        const user = await models.user.findOne({ where: { id: decryptedId.userId}});
        //get all possible achs
        const response = await models.achievement.findAll()
        var achs = []
        for(ach of response){
            achs.push(ach.dataValues.title)
        }
        //get completed achs
        const resp = await user.getAchievements()
        var completed = []
        for(ach of resp){
            completed.push(ach.dataValues.title)
        }

        var incompleted = []

        for(ach of achs){
            if(completed.includes(ach) == false){
                incompleted.push(ach)
            }
        }

        res.json({incompleted: incompleted})

    }catch(error){
        console.log(error)
        res.json({error})
    }
}

//mark ach complete by user
achievementController.markComplete = async (req, res) => {
    try{
        //decrypt id
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        //get user
        const user = await models.user.findOne({ where: { id: decryptedId.userId}});
        //get achievement
        const ach = await models.achievement.findOne({
            where: {
                title: req.body.title
            }
        })
        //add that ach to the user's completed achs
        await user.addAchievement(ach)

        //get achs completed by user
        const completed = await user.getAchievements()

        res.json({completed: completed})

    }catch(error){
        res.json({error})
        console.log(error)
    }
}


module.exports = achievementController;