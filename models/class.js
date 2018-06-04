const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true},
  time: { type: Array, 'default': [], required: true},
  addressLine1: {type: String, required: true},
  addressLine2: {type: String, required: true},
  postcode: {type: String, required: true},
  discipline: {type: String, required: true},
  description: {type: String, required: true},
  image: String,
  website: {type: String, required: true},
  comments: [{
    comment: String,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }]
  //owner ?
});




module.exports = mongoose.model('Class', classSchema);
