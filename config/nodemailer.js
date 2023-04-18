const nodemailer = require ('nodemailer');
const ejs = require ('ejs');
const path = require ('path');
const env = require('./environment');

// Transporter sends the email - Mail protocols - SMTP , IMAP, POP
// let testAccount = nodemailer.createTestAccount();
const transporter = nodemailer.createTransport(env.smtp);

// Template of sending email will be an EJS template
let renderTemplate = (data, relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),       // EJS folder
        data,
        function(err, template){
            if (err) { console.log ('Error in rendering template', err); return ;}

            mailHTML = template;
        }
    )

    return mailHTML;
};

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}