const mongoose = require ('mongoose');
const multer  = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');  // Relative filepath for storing avatar

const userSchema = new mongoose.Schema( {
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    avatar: {
        type : String,           // We will store the file path here
    },
}, {
    timestamps : true
}
);

let storage = multer.diskStorage({                        // Diskstorage - Local storage
    destination: function (req, file, cb) {               // Request, file and callback function
      cb(null, path.join(__dirname, '..' , AVATAR_PATH))   // Absolute path for storing file
    },
    filename: function (req, file, cb) {                 // File name - add miliseconds timestamp
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + '-' + uniqueSuffix)      // Field that contains the file in the HTTP request
    }
  });

  // Static methods (Outside classes)- Can be called from controllers
  // 1. only a single file will be uploaded 2. Assigning the above storage variable
  userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar'); 
  userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);
module.exports = User;