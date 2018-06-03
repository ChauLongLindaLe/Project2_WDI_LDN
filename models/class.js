const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true},
  time: { type: Array, 'default': [], required: true},
  address: {type: String, required: true},
  category: {type: String, required: true},
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
