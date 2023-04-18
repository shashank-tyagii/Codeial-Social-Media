
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
    name : 'development' ,
    asset_path :process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY,           // Use random key generator
    db : 'codeial_production',
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
    google_call_back_url: "http://codeial.com/users/auth/google/callback",
    jwt_secret : process.env.CODEIAL_JWT_SECRET,                     // Use random key generator
};

module.exports = production;

//module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined? development : process.env.CODEIAL_ENVIRONMENT;