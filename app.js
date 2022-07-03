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
require('./config/passport')(passport);

// routers
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');

// middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// auth middleware
const { ensureAuth, ensureGuest } = require('./middleware/authentication');

// extra security packages require
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// rate limiter
app.set('trust proxy', 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);
// Passport middlewares
app.use(passport.session());
app.use(passport.initialize());

app.use(passport.initialize());

// logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// routes

app.get('/', (req, res) => {
  res.send('Login API');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/dashboard', dashboardRouter);

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
