const express = require("express");
const router  = express.Router();

const Booking = require('../../models/booking')

router.post('/getbookingsbyuserid',async(req,res)=>{
    const userid = req.body.userId;
    try {
      const bookings = await Booking.find({userId:userid})
      res.send(bookings)
    } catch (error) {
      return res.status(400).json({error})
      
    }
});

module.exports = router;
