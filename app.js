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

var app = express();

var router = express.Router();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
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
    user: '***********@gmail.com', // adding the email from which verification is to be sent
    pass: 'xxxxxxxxxx'  // password of that mail
  }
});





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

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
return res.redirect('index.html');
}).listen(3000)


app.post('/sign_up', function(req,res){
    var fname = req.body.fname;
    var email =req.body.email;
    var lsname = req.body.lsname;
    var admin =req.body.add_no;
    var LinkedIn=req.body.LinkedIn;

    var data = {
        "first_name": fname,
        "email":email,
        "last_name":lsname,
        "admission_no":admin,
        "linkedin":"http://www.linkedin.com/in/"+LinkedIn
    }
    var query = { admission_no: admin };
db.collection("details").findOne(query,function(err, result) {
    if (err) throw err;
    // checking if already registered or not
    if (result==null){
       console.log("new  record");

      db.collection('details').insertOne(data,function(err, collection){
      if (err) throw err;
      console.log("Record inserted Successfully");
       // if record is new, sending mail notification
       var mailOptions = {
             from: '*****************@gmail.com',
             to: email, // whatever email address user enters
             subject: 'verification mail',
             text: 'Thank you mentor for registering with us .Please click on the given link to confirm your account  '
           };

           transporter.sendMail(mailOptions, function(error, info){
             if (error) {
               console.log(error);
             } else {
               console.log('Email sent: ' + info.response);
             }
           });


           return res.redirect('signup_success.html');
        });

     }
 // if record already exists
    else{
        console.log(result);

        return res.redirect('exist.html');
       }

    db.close();
});

});

console.log("server listening at port 3000");




module.exports = app;
