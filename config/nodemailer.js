const nodemailer = require ('nodemailer');
const ejs = require ('ejs');
const path = require ('path');

// Transporter sends the email
let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',                 // SMTP Config
    port : '587',                            // 465- SSL, 587 - TSL
    auth : {
        user: '',
        pass : ''
    }
});

// Template of sending email will be an EJS template
let renderTemplate = (data, relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if (err) { console.log ('Error in rendering template'); return ;}

            mailHTML = template;
        }
    )

    return mailHTML;
};

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}