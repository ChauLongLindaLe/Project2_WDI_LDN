const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const classSchema = new mongoose.Schema({
  name: { type: String, required: true},
  time: { type: Array, 'default': [], required: true},
  address: {type: String, required: true},
  category: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  website: {type: String, required: true},
  comments: [commentSchema]
});


module.exports = mongoose.model('Class', classSchema);
