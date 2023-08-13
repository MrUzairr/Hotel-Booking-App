const express = require("express");
const router  = express.Router();

const Booking = require('../../models/booking')


router.get('/getallbookings',async(req,res)=>{
    try {
      const bookings = await Booking.find();
      res.send(bookings)
    } catch (error) {
      return res.status(400).json({error})
    }
  })
  
  module.exports = router;