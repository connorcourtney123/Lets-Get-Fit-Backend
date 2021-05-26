// grab models
const models = require('../models');

// data encryption
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// controller obj
const nutritionController = {};

// signup
nutritionController.saveDay = async (req, res) =>{
    try{
        //decrypt id
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

        //get user
        const user = await models.user.findOne({ where: { id: decryptedId.userId}});

        const usersDays = await user.getNutrition()
        
        var dateUsed=false;
        var dayToUpdate={};
        for(day of usersDays){
            if(day.date == req.body.date){
                dateUsed=true;
                dayToUpdate = day;
            }
        }

        if(dateUsed){
            const changes = await dayToUpdate.update({
                protien: req.body.protien,
                fat: req.body.fat,
                carbs: req.body.carbs
            })

            res.json({message:"day updated", day: changes})
        }else{

            const newDay = await models.nutrition.create({
                userId: decryptedId.userId,
                date: req.body.date,
                protien: req.body.protien,
                fat: req.body.fat,
                carbs: req.body.carbs
            })

            res.json({message:"new day saved", day: newDay})
        }

    }catch(error){
        res.json({error})
        console.log(error)
    }
}

//get nutrition log for specific day
nutritionController.getDay = async (req, res) => {
    try{
        //decrypt id
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

        const day = await models.nutrition.findOne({
            where: {
                userId: decryptedId.userId,
                date: req.body.date
            }
        })

        res.json({message: "day found", nutrition: day})

    }catch(error){
        res.json({error})
        console.log(error)
    }
}

nutritionController.getUsersNutrition = async (req, res) => {
    try{
        //decrypt id
                const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

        //get user
        const user = await models.user.findOne({ where: { id: decryptedId.userId}});

        const usersDays = await user.getNutrition()

        res.json({nutrition: usersDays})

    }catch(error){
        console.log(error)
        res.json({error})
    }
}

module.exports = nutritionController;