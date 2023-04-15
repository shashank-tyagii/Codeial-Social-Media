const nodemailer = require ('../config/nodemailer');


// Another way of exporting a function
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment : comment}, '/comments/new_comment.ejs');

    console.log ('Inside new comment mailer');

    nodemailer.transporter.sendMail({
        from : 'shashank.tyagi1234@gmail.com',
        to : comment.user.email,
        subject : 'New comment published',
        html : htmlString,                       //  '<h1> Your comment is published </h1>'
    }, (err, info) => {
        if (err){console.log('Error in sending mail', err); return;}

        console.log('Mail delivered', info);
        return;
    });
}