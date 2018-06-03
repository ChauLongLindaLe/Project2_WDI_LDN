const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, required: true},
  password: { type: String, required: true },
  address: String,
  isVenue: String,
  comments: String
},{
  timestamps: true
});

//Validate Password
userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

//Hash Password 
userSchema
  .pre('save', function(next){
    if(this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    }

    next();
  });

//Password Confirmation

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });


userSchema
  .pre('validate', function(next){
    if(this.isModified('password') && this._passwordConfirmation !== this.password){
      this.invalidate('password');
    }
    next();
  });


module.exports = mongoose.model('User', userSchema);
