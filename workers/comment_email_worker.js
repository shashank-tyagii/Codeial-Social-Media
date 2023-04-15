// This worker will send email for us, instead of asceding directly from controller
const queue = require ('../config/kue');
const commentsMailer = require ('../mailers/comments_mailer');

// Adding process for putting emails into queue
queue.process('emails',20, function(job, done){
    console.log('EMail worker is processing the job', job.data);

    commentsMailer.newComment(job.data);

    done();
});