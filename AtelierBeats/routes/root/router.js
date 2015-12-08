/** @module users/router */
'use strict';

var middleware = require('../middleware');
var rootUrl = require("../../config").url;
var express = require('express');
var router = express.Router();

// Used for resenting the password.
var crypto = require("crypto"); // node module
var nodemailer = require("nodemailer");
var async = require("async");
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.all('/', middleware.supportedMethods('GET, POST, OPTIONS'));

var isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }

}

/* Validation of email should be done server-side because JS could be disabled,
but for now I am going to do it client-side for simplicity. 
Source: http://stackoverflow.com/a/46181/3924118
*/
function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

/* When required this router from app.js, 
the passport instance created there is passed to this function. */
module.exports = function(passport) {

  /* GET Home Page */
  router.get('/', isAuthenticated, function(req, res) {

    res.render('library', {
      // passing the id of and username the connecting user to the dust
      userid: req.user._id,
      username: req.user.userName
    });
  });

  router.get('/library', isAuthenticated, function(req, res) {
    res.render('library', {
      // passing the id of and username the connecting user to the dust
      userid: req.user._id,
      username: req.user.userName
    });
  });

  /* GET login page. */
  router.get('/login', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('login', {
      message: req.flash('message')
    });
  });

  /* Handle Login POST 

  password.authenticate is used to delegate the authentication 
  to the login strategy when a HTTP POST is made to /login.
  */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/library',
    failureRedirect: '/',
    failureFlash: true,
    session: true
  }));

  /* GET Registration Page */
  router.get('/signup', function(req, res) {
    res.render('signup', {
      message: req.flash('message')
    });
  });
  /* Handle Registration POST 

  password.authenticate is used to delegate the authentication 
  to the signup strategy when a HTTP POST is made to /signup.
  */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true,
    session: false // http://stackoverflow.com/a/34147319/3924118
  }));

  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  /*
  Reseting password based on this article:
  http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
  */
  router.get("/forgotpassword", function(req, res) {
    res.render("forgotPassword");
  });

  router.post('/forgotpassword', function(req, res, next) {

    console.log("post: /forgotpassword")

    if (!validateEmail(req.body.email)) {
      return res.render("forgotPassword", {
        message: "Invalid Email Format."
      });
    }

    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          // Generation of a unique token, i.e. no two exact password reset tokens at one time
          var token = buf.toString('hex');

          // Passing token down the async.waterfall to the next function
          // which looks up a user by the provided e-mail address.
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({
          email: req.body.email
        }, function(err, user) {

          if (!user) {
            return res.render("forgotPassword", {
              message: "No account with that email address exists."
            });
          }

          // There's an account with req.body.email address
          user.resetPasswordToken = token;

          // Password reset link will be active only for 1 hour
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function(err) {
            done(err, token, user);
          });

        });
      },
      function(token, user, done) {

        // NB! No need to recreate the transporter object. You can use
        // the same transporter object for all e-mails
        var smtpTransport = nodemailer.createTransport('SMTP', {

          /* 
          Possible services: SendGrid, Gmail, Mailgun, iCloud, Hotmail, etc.
          See nodemailer docs for more info.

          See: http://stackoverflow.com/questions/19509357/not-able-to-connect-to-outlook-com-smtp-using-nodemailer
          */
          service: 'Gmail',
          auth: {
            user: "atelierbeatsteam@gmail.com",
            pass: "uqkidefjjcanncnc"
          }
        });

        console.log(token)

        // setup e-mail data with unicode symbols
        var mailOptions = {
          to: user.email,
          from: 'Atelier Beats Team <atelierbeatsteam@gmail.com>',
          subject: 'AtelierBeats Account Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/resetpassword/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };

        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(err) {
          done(err, user);
        });

      }

    ], function(err, user) {
      if (err) return next(err);
      console.log("Rendering 'instructions have been sent...'");

      if (req.accepts("html"))
        console.log("Accepts HTML!");

      return res.render('forgotPassword', {
        message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'
      });

    });

  });

  router.get('/resetpassword/:token', function(req, res) {

    console.log("get: /resetpassword/:token")
    console.log("Token: ", req.params.token);

    // http://stackoverflow.com/a/31179203/3924118
    var start = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));

    User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        "$gte": start
      }
    }, function(err, user) {

      if (!user) {
        console.log("User not found");

        return res.render("resetPassword", {
          message: 'Password reset token is invalid or has expired.'
        });
      }

      console.log("User found with token: ", req.params.token, " and it has not expired.");

      return res.render("resetPassword", {
        resetPasswordToken: user.resetPasswordToken
      });

    });

  });

  router.post('/resetpassword/:token', function(req, res) {

    console.log("router.post('/resetpassword/:token'...")

    async.waterfall([

      function(done) {
        // http://stackoverflow.com/a/31179203/3924118
        var start = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));

        // Checking if the password token is still valid
        User.findOne({
          resetPasswordToken: req.params.token,
          resetPasswordExpires: {
            "$gte": start
          }
        }, function(err, user) {

          if (req.body.password != req.body.repeatedPassword) {
            return res.render("resetPassword", {
              resetPasswordToken: user.resetPasswordToken,
              errorMessage: "Passwords do not match."
            });
          }

          if (!user) {
            console.log("User not found.")
            return res.render("resetPassword", {
              message: 'Password reset token is invalid or has expired.'
            });
          }

          // User found and we update its password!
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save(function(err) {
            if (err) {
              console.log('Error in saving user: ' + err);
              throw err;
            }
            console.log('User\'s password successfully changed.');
            return done(null, user);
          });

        });

      },
      function(user, done) {

        var smtpTransport = nodemailer.createTransport('SMTP', {
          service: 'Gmail',
          auth: {
            user: "atelierbeatsteam@gmail.com",
            pass: "uqkidefjjcanncnc"
          }
        });

        var mailOptions = {
          to: user.email,
          from: 'Atelier Beats Team <atelierbeatsteam@gmail.com>',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };

        smtpTransport.sendMail(mailOptions, function(err) {
          done(err);
        });

      }
    ], function(err) {
      return res.render("resetPassword", {
        message: 'Your password has been changed.'
      });

    });
  });

  return router;
}
