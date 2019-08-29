/*var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '*******@gmail.com',
    pass: '***********'
  }
});

var mailOptions = {
  from: '***********@gmail.com',
  to: '*****************@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});*/

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meetup');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
});

var query = { email: "********************.com" };
db.collection("details").findOne(query,function(err, result) {
if (err) throw err;
if (result==null){
   console.log("new  record");
}
else {
    console.log(result);
}

db.close();
});
