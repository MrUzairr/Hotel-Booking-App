const express = require('express');
const router = express.Router();

const User = require('../../models/user');


router.post('/register',async(req,res)=>{
    const newUser = new User({name:req.body.name,email:req.body.email,password:req.body.password});

    console.log(newUser);
    try {
        const user = await newUser.save();
        console.log(user);
        res.send('User Registered Successfully')
    } catch (error) {
        return res.status(400).json({error})
    }

});

module.exports = router
