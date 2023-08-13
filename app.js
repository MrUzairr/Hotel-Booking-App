var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const database = require('./database/mongodb');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Users Routes
var resistersRouter = require('./routes/UserRoutes/resgister');
var loginsRouter = require('./routes/UserRoutes/login');
var getallusersRouter = require('./routes/UserRoutes/getAllUsers');
// Rooms Routes
var addRoomsRouter = require('./routes/roomRoutes/addRooms');
var getAllRoomsRouter = require('./routes/roomRoutes/getAllRooms');
var getRoomByIdsRouter = require('./routes/roomRoutes/getRoomById');
// Booking Routes
var bookRoomsRouter = require('./routes/bookingRoutes/bookroom');
var cancelBookingsRouter = require('./routes/bookingRoutes/cencelBooking');
var getAllBookingsRouter = require('./routes/bookingRoutes/getAllBookings');
var getBookingByUserIdsRouter = require('./routes/bookingRoutes/getBookingByUserId');


var app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend URL
  credentials: true, // Allow cookies and authorization headers
}));

app.options('*', cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// User Routes
app.use('/api/users', resistersRouter);
app.use('/api/users', loginsRouter);
app.use('/api/users', getallusersRouter);
// Room Routes
app.use('/api/rooms', addRoomsRouter);
app.use('/api/rooms', getAllRoomsRouter);
app.use('/api/rooms', getRoomByIdsRouter);
// Booking Routes
app.use('/api/bookings', bookRoomsRouter);
app.use('/api/bookings', cancelBookingsRouter);
app.use('/api/bookings', getAllBookingsRouter);
app.use('/api/bookings', getBookingByUserIdsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
