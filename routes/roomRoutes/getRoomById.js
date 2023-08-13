const express = require('express');
const router = express.Router();
const Room = require('../../models/room');

router.get('/getroombyid',async(req,res)=>{
    const roomid = req.query.roomid;
    try {
        const rooms = await Room.findOne({_id:roomid})
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({error});
    }
});

module.exports = router;
