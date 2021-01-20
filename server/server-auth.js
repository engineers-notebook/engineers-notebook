/**
 *  This file sets up authorization routes and passport options for session management.
 *
 * All requests will have access to req.user, that will contain the user object (provided by passport.deserializeUser)
 */

// TODO: add local strategy support:

const cookieSession = require('cookie-session');
const passport = require('passport');
const { googleClientId, googleClientSecret, cookieEncryptionKey } = require('./settings');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (app) => {
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
    passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/dashboard' })
  );

  // route to iniate oauth flow.
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  // route to logout
  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
