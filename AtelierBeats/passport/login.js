var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

  passport.use('login', new LocalStrategy({
        passReqToCallback: true
      },

      function(req, username, password, done) {
        // check in mongo if a user with username exists or not

        User.findOne({
            'userName': username
          },

          function(err, user) {

            console.log("login.js è stato chiamato")
              // In case of any error, return using the done method
            if (err)
              return done(err);

            // Username does not exist, log the error and redirect back
            if (!user) {
              console.log('User Not Found with username ' + username);
              return done(null, false, req.flash('message', 'User not found.'));
            }

            // User exists but wrong password, log the error 
            if (!isValidPassword(user, password)) {
              console.log('Invalid Password');
              // redirect back to login page
              return done(null, false, req.flash('message', 'Invalid Password'));
            }

            // User and password both match, return user from done method
            // which will be treated like success
            return done(null, user);
          }
        );

      })

  );

  var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  }

}
