require('dotenv').config();
var fs = require('fs');
var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SG_KEY);

var fromEmail = new helper.Email('test@example.com');
var toEmail = new helper.Email('malinda.iw@gmail.com');
var subject = 'Test subject';
var content = new helper.Content('text/html', '<i>Hello</i>, <b>this email</b> is sent using the sendgrid service');
var mail = new helper.Mail(fromEmail, subject, toEmail, content);

var attachment = new helper.Attachment();
var file = fs.readFileSync('Eloquent_JavaScript.pdf');
var base64File = new Buffer(file).toString('base64');
attachment.setContent(base64File);
attachment.setType('application/text');
attachment.setFilename('Eloquent_JavaScript.pdf');
attachment.setDisposition('attachment');

// Add attachment to mail
mail.addAttachment(attachment);

var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON()
});

sg.API(request, function (error, response) {
  if (error) {
    console.log('Error response received');
  }
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
});