
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  img:
  {
    data: Buffer,
    contentType: String
  },
  visited: {
    type: Number,
    default: 0,
    enum: [0, 1],
  },
  created: {
    type: Date,
    default: Date.now
  },
});

//Post is a model which has a schema imageSchema

module.exports = new mongoose.model('Post', postSchema);
