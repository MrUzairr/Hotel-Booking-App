const express = require("express");
const router  = express.Router();
const Room = require("../../models/room");
const Booking = require('../../models/booking')

router.post('/cancelbooking',async(req,res)=>{
    const {bookingid,roomid} = req.body
    try {
      const bookingitem = await Booking.findOne({_id:bookingid});
      bookingitem.status = 'cancelled';
      await bookingitem.save();
      const room = await Room.findOne({_id:roomid});
      const bookings = room.currentBooking;
      const temp = bookings.filter(booking => booking.bookingId.toString()!== bookingid);
      room.currentBooking = temp;
      await room.save()
      res.send('Booking Cancelled Successfully')
    } catch (error) {
      return res.status(400).json({error})
    }
});

module.exports = router;
