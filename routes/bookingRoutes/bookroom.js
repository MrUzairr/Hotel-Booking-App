const express = require("express");
const router  = express.Router();
const Room = require("../../models/room");
const Booking = require("../../models/booking");
const { moment } = require("moment");
const {v4:uuidv4} = require('uuid');
const stripe = require('stripe')('sk_test_51Nbd37IiTi99yyfxIRmDZ5diBkv3iwB58gBqaELdtoqNC40NS7wIQOBJepDZYdJQo4OMPqIFXou7TcfnqzGa6Jor00oPGbjd39')

router.post("/bookroom", async (req, res) => {
    const { room, userId, fromDate, toDate, totalAmount, totalDays, token } = req.body;
    try {
          const customer = await stripe.customer.create(
              {
                  email: token.email,
                  source: token.id
              }
          )
          const payment = await stripe.charges.create(
              {
                amount: totalAmount*100,
                customer:customer.id,
                currency:'pkr',
                receipt_email:token.email
              },
              {
                  idempotencyKey: uuidv4()
              }
          )
          if(payment){
              const newBooking = new Booking({
                room: room.name,
                roomId: room._id,
                userId,
                fromDate: moment(fromDate).format("DD-MM-YYYY"),
                toDate: moment(toDate).format("DD-MM-YYYY"),
                totalAmount,
                totalDays,
                transectionId: "1234",
              });
              const booking = await newBooking.save();
              const roomtemp = await Room.findOne({ _id: room._id });
              console.log(roomtemp)
              roomtemp.currentBooking.push({
                bookingId: booking._id,
                fromDate: moment(fromDate).format("DD-MM-YYYY"),
                toDate: moment(toDate).format("DD-MM-YYYY"),
                userId:userId,
                status:booking.status
              });
              await roomtemp.save()
  
          }
          res.send("Payment Successfull, Your room is booked")
          
      } catch (error) {
          return res.status(400).json({error})
      }
  
  });
  

  module.exports = router;
