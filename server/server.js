const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 3000;

// const frontend = require('./routes/frontendRoutes.js');
const groupController = require('./controller/groupController.js');
const cardController = require('./controller/cardController.js');
const notebookController = require('./controller/notebookController.js');
const userController = require('./controller/userController.js');

//////////////////////////////////////////////////////////////
// execute auth file with this instance of app
// require('./server-auth')(app);


const cookieSession = require('cookie-session');
const passport = require('passport');
const { googleClientId, googleClientSecret, cookieEncryptionKey } = require('./settings');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('./models/taskModel');

  // http://www.passportjs.org/docs/google/
  // https://dev.to/phyllis_yym/beginner-s-guide-to-google-oauth-with-passport-js-2gh4
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: `/auth/google/callback`,
      },
      // TODO: refactor with transactions
      (accessToken, refreshToken, profile, done) => {
        const gUser = { id: profile.id, username: profile.displayName };
        // get user from users table using profile.id

        const findUserQuery = `SELECT * FROM users WHERE user_id = $1`;
        const findUserParams = [gUser.id];

        db.query(findUserQuery, findUserParams).then(({ rows }) => {
          if (rows.length) return done(null, gUser);

          // if user not in db
          // create user in users table with profile.id
          const createUserQuery = `INSERT INTO users (user_id, username) VALUES ($1, $2);`;
          const userValues = [gUser.id, gUser.username];

          db.query(createUserQuery, userValues).then(() => {
            const addToWelcome = `INSERT INTO user_groups (group_id, user_id) VALUES (1, $1)`;
            const addToWelcomeParams = [gUser.id];
            db.query(addToWelcome, addToWelcomeParams).then(() => {
              done(null, gUser);
            });
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
    console.log('serialize user', user);
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // callss done with user object that can be retrieved with id provided to serializeUser
    const findUserQuery = `SELECT * FROM users WHERE user_id = $1`;
    const findUserParams = [id];

    db.query(findUserQuery, findUserParams).then(({ rows }) => {
      const {user_id: id, username} = rows[0]
      done(null, {id,username});
    });
  });

  // route to listen to google's oauth callback
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/dashboard', successRedirect: '/dashboard' })
  );

  // route to iniate oauth flow.
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  // route to logout
  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

///////////////////////////////////////////////////////////////////////////
// body parsing/url parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// serve build folder/statically serving client folder
app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, '../client')));

// routes
app.get(
  '/api/user/groups',
  (req, res, next) => {
    console.log('session-server', req.session)
    console.log('user-server', req.user)
    next()
  },
  userController.getGroups,
  (req, res) => {
    res.json({
      username: req.user.username,
      userGroups: res.locals.userGroups,
    });
  }
);

// routes
// app.get('/api/user/groups', notebookController.getNotebooks, (req, res) => {
//   res.json(res.locals.notebooks);
// });

app.get('/api/cards/group/:groupId', groupController.getCards, (req, res) => {
  res.json(res.locals.cards);
});

// --------- post new cards -------------

app.post('/api/card', cardController.postCard, (req, res) => {
  res.json(res.locals.newCard);
});


app.patch('/api/updateCard', cardController.updateCard, (req, res) => {
  res.json(res.locals.updateCard);
});


app.delete('/api/deleteCard', cardController.deleteCard, (req, res) => {
  res.json(res.locals.deletedCard);
})



// --------- post new notebooks -------------

// app.post('/api/notebook', notebookController.postNotebook, (req, res) => {
//   res.json(res.locals.newNotebook);
// });


// app.patch('/api/updateNotebook', notebookController.updateNotebook, (req, res) => {
//   res.json(res.locals.updateNotebook);
// });


// app.delete('/api/deleteNotebook', notebookController.deleteNotebook, (req, res) => {
//   res.json(res.locals.deletedNotebook);
// })



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
