const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://ienxternal:2Gc2fdeRl21izvPO@cluster0.faxrslx.mongodb.net/Testship',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
