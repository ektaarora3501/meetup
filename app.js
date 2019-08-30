var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//const mongo =require('mongodb').MongoClient
//const url = 'mongodb://localhost:27017'

//mongo.connect(url, {useNewUrlParser: true});
//var popupS=require('popups');

var app = express();
var router = express.Router();
//var jsalert=require('js-alert');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/dashboard.html')));

app.use('/', usersRouter);
app.use('/users', usersRouter);

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

/* using node mailer to send email to verify account*/
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '**************@gmail.com', // adding the email from which verification is to be sent
    pass: 'xxxxxxxxxxxxx',  // password of that mail
  }
});


var otp;
var data;
var express=require("express");

var bodyParser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meetup');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
//var db=require('./database.js')
console.log(typeof db)
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/',function(req,res){
  console.log('in it');
  res.redirect('/dashboard.html')
})



app.get('/signup',function(req,res){
  return res.redirect('signup.html');
})

app.post('/verification', function(req,res){
    var fname = req.body.fname;
    var email =req.body.email;
    var lsname = req.body.lsname;
    var admin =req.body.add_no;
    var LinkedIn=req.body.LinkedIn;
    //var //twitter=req.body.Twitter;

     data = {
        "first_name": fname,
        "email":email,
        "last_name":lsname,
        "admission_no":admin,
        "linkedin":"http://www.linkedin.com/in/"+LinkedIn
        //"twitter":twitter;
    }
var query = { admission_no: admin };
db.collection("details").findOne(query,function(err, result) {
    if (err) throw err;
    // checking if already registered or not
    if (result==null){
       console.log("new  record");
        otp=Math.floor((Math.random() * 100000) + 1);
       // if record is new, sending mail notification
       console.log(otp);
       var mailOptions = {
             from: '**************@gmail.com',
             to: email, // whatever email address user enters
             subject: 'verification mail',
             text: 'Thank you mentor for registering with us .Here is your otp ' +otp,
           };

           transporter.sendMail(mailOptions, function(error, info){
             if (error) {
               console.log(error);
             } else {
               console.log('Email sent: ' + info.response);
             }
           });


           return res.redirect('verification.html');

     }
 // if record already exists
    else{
      res.set({
          'Access-control-Allow-Origin': '*'
          });
        /*  popup.alert({
            content:'the record already exists'
          });*/
          return false
        //return res.redirect('index.html');
    }

    db.close();
});

});

/*app.post('/signup_success',function(res,req){
   console.log('verified otp');
  return res.redirect('signup_success.html');
});*/
app.post('/signup_success', function(req,res){
  var value = req.body.otp;
  console.log("value is",value);
  if (value==otp){
     db.collection('details').insertOne(data,function(err, collection){
     if (err) throw err;
        console.log("Record inserted Successfully");
       });



     return res.redirect('signup_success.html');
  }
  else{
    /*popup.alert({
      content:'invalid otp'
    });*/
     return res.redirect('verification.html');
  }

}).listen(3000);

console.log("server listening at port 3000");

module.exports = app;
