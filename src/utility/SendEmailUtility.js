var nodemailer = require('nodemailer');

//SMTP SETUP
const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {

    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "tech.syscomatic@gmail.com",
            pass: "htolqpsalypfpdmg"
        }
    });

    let mailOptions = {
        from: 'Syscomatic-Technologies  <tech.syscomatic@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return await transporter.sendMail(mailOptions)

}

//https://nodemailer.com/about/
module.exports = SendEmailUtility