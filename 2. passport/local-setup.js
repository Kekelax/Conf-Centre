const bcrypt = require("bcryptjs");
const User = require("../4. models/user-model");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Match user
      User.findOne({ email: email, type: "LOCAL" }).then((currentUser) => {
        if (!currentUser) {
          return done(null, false, { msg: "Login credentials incorrect!" });
        }

        // Match password
        bcrypt.compare(password, currentUser.password, (err, passwordMatch) => {
          if (err) throw err;
          if (passwordMatch) {
            return done(null, currentUser);
          } else {
            return done(null, false, { msg: "Login credentials incorrect!" });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    //passes user id from passport.use done() to put in a cookie
    done(null, user.id);
  });

  /*When the cookie comes back from the browser
  takes the id that is stored in it and finds the 
  user the DB. the call done() method to send the user to the 
  next stage */

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      //attaches the user property to the request object
      done(null, user);
    });
  });
};
