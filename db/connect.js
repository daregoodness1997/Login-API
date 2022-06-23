const mongoose = require('mongoose');

const connectDB = async connection_url => {
  try {
    mongoose.connect(connection_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (e) {
    console.log('Database not connected' + e);
  }
};

module.exports = connectDB;
