const mongoose = require('mongoose');

//put min lengths in for each.
const classSchema = new mongoose.Schema({
  name: { type: String, required: true},
  venue: {type: String, required: true},
  time: { type: Array, 'default': [], required: true},
  instructor: { type: String, required: true},
  discipline: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String , required: true},
  price: {type: Number, required: true},
  comments: [{
    subject: {type: String ,minlength: 3},
    comment: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }]
}, {
  timestamps: true
});




module.exports = mongoose.model('Class', classSchema);
