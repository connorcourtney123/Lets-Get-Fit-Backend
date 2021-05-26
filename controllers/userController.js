// grab models
const models = require('../models');

// data encryption
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// controller obj
const userController = {};

// signup
userController.signup = async (req, res) =>{
    try {
        // hash password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        // create user
        const user = await models.user.create(
        {
            username: req.body.username,
            password: hashedPassword
        })
        // encrypt id
        const encryptedId = jwt.sign({ userId: user.id}, process.env.JWT_SECRET);
        //console.log(encryptedId)
        // return encrypted user id
        res.json({ message: 'sign up successfull', userId: encryptedId })
    } catch (error) {
        // check if error is from unqiue email validation
        if (error.message === 'Validation error')
        {
            res.json({ error: 'username already taken' });
        }
        // unknown error
        else
        {
            console.log(error)
            res.json({ error: error.message });
        }
    }
}

//login
userController.login = async (req, res) =>{
    try {
        // grab user by username
        const user = await models.user.findOne({ where: { username: req.body.username}});
        // check if passwords match
        if (bcrypt.compareSync(req.body.password, user.password))
        {
            // encrypt id
            const encryptedId = jwt.sign({ userId: user.id}, process.env.JWT_SECRET);
            // return encrypted user id
            res.json({ message: 'login successfull', username: user.username, userId: encryptedId })
        }
        // wrong password
        else
        {
            // status 401 - unauthorized
            res.status(401).json({ error: 'incorrect password' })
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ message: 'login failed', error: error.message });
    }
}

userController.verify = async (req, res) => {
    try{
        //decrypt id
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        //get user
        const user = await models.user.findOne({ where: { id: decryptedId.userId}});

        // encrypt id
        const encryptedId = jwt.sign({ userId: user.id}, process.env.JWT_SECRET);

        res.json({message:'user found', username: user.username, id: encryptedId})

    }catch(error){
        // status 400 - bad request
        res.status(400).json({ message: 'user authorization error', error: error.message })
    }
}


module.exports = userController;