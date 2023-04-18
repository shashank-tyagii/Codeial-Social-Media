
const development = {
    name : 'development' ,
    asset_path : './assets',
    session_cookie_key : 'blahsomething',
    db : 'codeial_development',
    smtp: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'immanuel.mccullough27@ethereal.email',
            pass: 'eQQ8Du6sXJ12GbgJeY'
        }
    },
    google_client_id: '530004411725-3i6v8fhdf56b81il8v8s8lj2mo4sb6hv.apps.googleusercontent.com',
    google_client_secret: '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', 
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial',

};

const production = {
    name : 'production',
};


module.exports = development;