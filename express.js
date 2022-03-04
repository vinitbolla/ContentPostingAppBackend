const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const multer = require('multer');
const fs = require('fs');
const post = require('./models/post');

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

//View engiene
app.set("view engine", "ejs");

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  }
});


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });

// - the GET request handler that provides the HTML UI

app.get('/', async (req, res) => {
  let numberOfPosts = req.query.numberOfPosts;
  console.log(numberOfPosts);
  const update = {
    visited: 1
  };

  post.find({ visited: 0 }, async (err, posts) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    let results = [];
    let sortedArray = posts.sort((a, b) => a.created - b.created);
    sortedArray.reverse();

    if (posts.length < numberOfPosts) {
      numberOfPosts = posts.length
    }
    for (let i = 0; i < numberOfPosts; i++) {

      if (sortedArray[i].visited == 0) {
        results.push(sortedArray[i]);
        let singlePost = {
          _id: sortedArray[i]._id,
          title: sortedArray[i].title
        }

        let doc = await post.findOneAndUpdate(singlePost, update, {
          new: true
        });

      }

    }
    res.render('imagesPage', { items: results });
  });




  // let items = post.find({}, (err, data) => {
  //   // console.log(items);
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send('An error occurred', err);
  //   }
  //   else {
  //     //   // res.render(items);
  //     //   // res.render('imagesPage', { items: items });
  //     res.send(data);
  //   }
  // });

  // res.send(items);
});

// - the POST handler for processing the uploaded file

app.post('/', upload.single('image'), (req, res, next) => {

  var obj = {
    title: req.body.name,
    img: {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: 'image/png'
    }
  }
  post.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    }
    else {
      item.save();
      res.redirect('/');
    }
  });
});


module.exports = app;