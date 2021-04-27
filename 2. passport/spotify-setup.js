const keys = require("../1. config/app_keys");
const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");
const User = require("../4. models/user-model");

module.exports = function (passport) {
  passport.use(
    new SpotifyStrategy(
      {
        clientID: keys.spotify.clientID,
        clientSecret: keys.spotify.clientSecret,
        callbackURL: "/auth/spotify/callback",
      },
      (accessToken, refreshToken, expires_in, profile, done) => {
        console.log(profile);
        // Passport callback

        //check if user already exists in the DB
        User.findOne({ email: profile._json.email }).then((currentUser) => {
          if (currentUser) {
            // console.log("user is: " + currentUser.user_name);
            //If current user, return user data
            done(null, currentUser);
          } else {
            //User does not exist -> create user in the DB
            new User({
              user_name: profile._json.display_name,
              email: profile._json.email,
              type: "SPOTIFY",
              super_user: false,
            })
              .save()
              .then((newUser) => {
                console.log("New user created: " + newUser.user_name);

                done(null, newUser);
              });
          }
        });
      }
    )
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
