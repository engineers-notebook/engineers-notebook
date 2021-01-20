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
const db = require('./models/taskModel');

module.exports = (app) => {
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
        const gUser = { id: profile.id, username: profile.displayName };
        // get user from users table using profile.id

        const findUserQuery = `SELECT * FROM users WHERE user_id = $1`;
        const findUserParams = [gUser.id];

        db.query(findUserQuery, findUserParams).then(({rows}) => {
          if (rows.length) return done(null, gUser);

          // if user not in db
          // create user in users table with profile.id
          const createUserQuery = `INSERT INTO users (user_id, username) VALUES ($1, $2);`;
          const userValues = [gUser.id, gUser.username];

          db.query(createUserQuery, userValues).then(() => {
            done(null, gUser);
          });
        });
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
    console.log('serialize user', user)
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // callss done with user object that can be retrieved with id provided to serializeUser
    const findUserQuery = `SELECT * FROM users WHERE user_id = $1`;
    const findUserParams = [id];

    db.query(findUserQuery, findUserParams).then(({rows}) => {
      done(null, rows[0]);
    });
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
