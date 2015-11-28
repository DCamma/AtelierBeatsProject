/** @module users/router */
'use strict';

var middleware = require('../middleware');
var rootUrl = require("../../config").url;

//supported methods

// router.get('/', function(req, res, next) {

//   res.render('login');

// });

// /** router for /users */
// module.exports = router;

var express = require('express');
var router = express.Router();

router.all('/', middleware.supportedMethods('GET, POST, PUT, OPTIONS'));

var isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated()) {    
    return next();
  }
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

module.exports = function(passport) {

  /* GET login page. */
  router.get('/', function(req, res) {
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
    failureFlash: true
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
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  /* GET Home Page */
  router.get('/library', isAuthenticated, function(req, res) {
    res.render('library', {
      user: req.user
    });
  });

  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}
