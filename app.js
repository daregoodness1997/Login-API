require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
// connect DB to
const connectDB = require('./db/connect');
const morgan = require('morgan');

// Passport Config
// require('./config/passport')(passport);

// routers
const authRouter = require('./routes/auth');

// middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// extra security packages require
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// rate limiter
app.set('trust proxy', 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// Passport middlewares

app.use(passport.initialize());

// logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// routes
app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
