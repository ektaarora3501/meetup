var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pycoders3501@gmail.com',
    pass: 'stephen3501@'
  }
});

var mailOptions = {
  from: 'pycoders3501@gmail.com',
  to: 'ektaarora3501@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
