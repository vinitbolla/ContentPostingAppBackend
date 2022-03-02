// Step 3 - this is the code for ./models.js

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  img:
  {
    data: Buffer,
    contentType: String
  }
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model('Image', postSchema);
