
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  img:
  {
    data: Buffer,
    contentType: String
  }
});

//Post is a model which has a schema imageSchema

module.exports = new mongoose.model('Post', postSchema);
