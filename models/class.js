const mongoose = require('mongoose');

//put min lengths in for each.
const classSchema = new mongoose.Schema({
  className: { type: String, required: true},
  venue: {type: String, required: true},
  time: { type: Array, 'default': [], required: true},
  addressLine1: {type: String, required: true},
  addressLine2: {type: String, required: true},
  postcode: {type: String, required: true},
  discipline: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String},
  website: {type: String, required: true},
  price: {type: Number, required: true},
  comments: [{
    subject: {type: String},
    comment: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }]
});




module.exports = mongoose.model('Class', classSchema);
