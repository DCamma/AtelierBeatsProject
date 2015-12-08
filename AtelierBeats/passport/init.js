var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var login = require('./login');
var signup = require('./signup');
var User = mongoose.model('User');

/**
Why do we need serializeUser and deserializeUser?
Essentially it allows you to stay logged-in when navigating between different pages within your application.
See: http://stackoverflow.com/questions/19268812/do-i-implement-serialize-and-deserialize-nodesjs-passport-redisstore

Understanding serialize and deserialise:
- http://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
*/

module.exports = function(passport) {

  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function(user, done) {
    console.log('Serializing user:', user.userName);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('Deserializing user:', user.userName);
      done(err, user);
    });
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  login(passport);
  signup(passport);
}
