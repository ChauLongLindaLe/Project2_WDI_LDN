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

//put min lengths in for each and max length
const classSchema = new mongoose.Schema({
  name: { type: String, required: true},
  venue: {type: String, required: true},
  time: { type: Array, 'default': [], required: true},
  instructor: { type: String, required: true},
  discipline: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String , required: true},
  price: {type: Number, required: true},
  comment: [commentSchema]
});



module.exports = mongoose.model('Class', classSchema);
