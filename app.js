require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
// connect DB to
const connectDB = require('./db/connect');
const morgan = require('morgan');

app.use(express.json());

// logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(
      port,
      console.log(
        `Server is running in ${process.env.NODE_ENV} on port ${port}...`
      )
    );
    await connectDB(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

start();
