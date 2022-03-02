const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: 'mongodb+srv://Test1234:Test1234@contentpostingappdb.moxbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}

module.exports = config