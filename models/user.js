const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true , minlength: 3},
  email: { type: String, unique: true, required: true},
  password: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: String,
  postcode: {type: String, required: true },
  profilePicture: { type: String, required: true },
  isVenue: { type: Boolean, default: false }
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
userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

//Validate Password
userSchema.pre('validate', function(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation');
  }
  next();
});


module.exports = mongoose.model('User', userSchema);
