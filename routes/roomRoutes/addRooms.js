const express = require('express');
const router = express.Router();
const Room = require('../../models/room');


router.post('/addroom',async(req,res)=>{  
    try {
        const room = new Room(req.body);
        await room.save();
        res.send('New Room Successfully Added')
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
})

module.exports = router;