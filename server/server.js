const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 3000;

const webpack = require('./routes/webpackRoutes.js');
const frontend = require('./routes/frontendRoutes.js');
const backend = require('./routes/backendRoutes.js');
const appconfig = require('./routes/appConfigRoutes.js');
const personal = require('./routes/personalRoutes.js');
const signup = require('./routes/signUpRoutes.js');
const dashboard = require('./routes/dashboardRoutes.js');

const cookieSession = require('cookie-session');
const passport = require('passport');
const { googleClientId, googleClientSecret, cookieEncryptionKey } = require('./settings');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// TODO: swap for real db
const mockDb = [];

// http://www.passportjs.org/docs/google/
// https://dev.to/phyllis_yym/beginner-s-guide-to-google-oauth-with-passport-js-2gh4
passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: `/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('------ GoogleStrategy cb ---------');
      // console.log('profile in cb', profile)
      try {
        // TODO: swap for real db
        if (mockDb.find((storedUser) => profile.id === storedUser.id)) done(null, profile);
        else {
          // TODO: swap for real db
          mockDb.push(profile);
          done(null, profile);
        }
      } catch (e) {
        console.error('error in google strategy callback', e);
      }
    }
  )
);

app.use(
  cookieSession({
    // day in ms
    maxAge: 24 * 60 * 60 * 1000,
    keys: [cookieEncryptionKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  // user is the user passed from done method inside GoogleStrategy
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // callss done with user object that can be retrieved with id provided to serializeUser
  // TODO: swap for real db
  done(
    null,
    mockDb.find((storedUser) => storedUser.id === id)
  );
});

// route to listen to google's oauth callback
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// route to iniate oauth flow.
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// route to logout
app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// body parsing/url parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// serve build folder/statically serving client folder
app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, '../client')));

// routes
app.use('/api', webpack);
app.use('/api', frontend);
app.use('/api', backend);
app.use('/api', appconfig);
app.use('/api', personal);
app.use('/api', signup);
app.use('/api', dashboard);

// --------- wrapped in if statement -------------
// app.use('/', (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, '../index.html'));
// });
// -----------------------------------------------

// error handling
app.use((req, res) => {
  res.status(400).send("This is not the page you're looking");
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(err);
  // console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// listen on port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
