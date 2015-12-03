/** @module users/router */
'use strict';

var middleware = require('../middleware');
var rootUrl = require("../../config").url;
var express = require('express');
var router = express.Router();

router.all('/', middleware.supportedMethods('GET, POST, PUT, OPTIONS'));

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

module.exports = function(passport) {

  /* GET Home Page */
  router.get('/', isAuthenticated, function(req, res) {
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

  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}
