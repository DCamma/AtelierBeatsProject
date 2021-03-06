var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

  passport.use('signup', new LocalStrategy({
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

      if (req.body.password !== req.body.repeatPassword) {
        return done(null, false, req.flash('message', "Passwords do not match."));
      }

      var findOrCreateUser = function() {

        // find a user in Mongo with provided username
        User.findOne({
          'userName': username
        }, function(err, user) {

          // In case of any error, return using the done method
          if (err) {
            console.log('Error in SignUp: ' + err);
            return done(err);
          }

          // already exists
          if (user) {
            console.log('User already exists with username: ' + username);
            return done(null, false, req.flash('message', 'User with username "' + username + '" already exists.'));

          } else {
            // if there is no user with that email create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.userName = username;
            newUser.password = password;
            newUser.email = req.body.email;
            newUser.firstName = req.body.firstname;
            newUser.lastName = req.body.lastname;

            // save the user
            newUser.save(function(err) {
              if (err) {
                console.log('Error in saving user: ' + err);
                throw err;
              }
              console.log('User registration succesful.');
              return done(null, newUser);
            });
          }
        });
      };

      // Delay the execution of findOrCreateUser and execute the method
      // in the next tick of the event loop
      process.nextTick(findOrCreateUser);

    }));

}
