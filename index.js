const config = require('./config/config.js');
const mongoose = require('mongoose');
const app = require('./express');
// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)
  .then((result) => app.listen(config.port, (err) => {
    if (err) {
      console.log(err)
    }
    console.info('Server started on port %s.', config.port)
  }))
  .catch((err) => console.log(err));
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})


