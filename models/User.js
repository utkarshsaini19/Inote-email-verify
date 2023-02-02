const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:  {
        type: String,
        require: true
    }, // String is shorthand for {type: String}
    email:  {
        type: String,
        require: true,
        unique: true
    },
    password:  {
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    verified:{
        type: Boolean,
        default: false
    }
    
    
  });

  // For unique value
  const User = mongoose.model('user',UserSchema);
  //User.createIndexes();
  module.exports = User;