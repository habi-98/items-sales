const express = require('express');
const User = require('../models/User');

const router = express.Router();


router.post('/', async (req, res) => {
    const user = new User(req.body);
    console.log('lol', req.body);
    user.generateToken();

    try {
        await user.save();
        return res.send({message: 'User registerd', user});
    } catch (error) {        
        console.log('error: ', error);
        return res.status(400).send(error);
    }
})

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'UUsername not found'})
    }

    const isMatch = await user.checkPassword(req.body.password)
    
    if (!isMatch) {
        return res.status(400).send({error: 'Password is wrong'})
    }

    user.generateToken();
    
    await user.save;


     res.send({message: 'Login succesful', user})
})
 
module.exports = router;