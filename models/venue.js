const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  subject: {type: String ,minlength: 3},
  comment: {type: String, minlength: 3},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

commentSchema.methods.isOwnedBy = function(user) {
  return this.user._id && user._id.equals(this.user._id);
};

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true},
  lessons: {type: String},
  addressLine1: {type: String, required: true},
  addressLine2: {type: String, required: true},
  postcode: {type: String, required: true},
  phone: { type: String, minlength: 11 },
  description: {type: String, required: true},
  image: String,
  website: {type: String, required: true},
  comments: [commentSchema],
  map: {
    lat: { type: Number},
    lng: { type: Number}
  }
});


module.exports = mongoose.model('Venue', venueSchema);
