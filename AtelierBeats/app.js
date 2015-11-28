var config = require('./config');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var dustjs = require('adaro');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');

// Connect to MongoDB here
mongoose.connect(config.mongoUrl + config.mongoDbName);

// Register model definition here
require('./models');

// dustjs view engine setup
app.engine('dust', dustjs.dust());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'dust');

//configure app
app.use(logger('dev'));

app.use(bodyParser.urlencoded({
  extended: false
})); // parse application/x-www-form-urlencoded

app.use(bodyParser.json()); // parse application/json
app.use(express.static(path.join(__dirname, 'public')));

/**
Why do we need to specify resave and saveUninitialized?

- http://stackoverflow.com/questions/24477035/express-4-0-express-session-with-odd-warning-message
- https://github.com/expressjs/session

About secret:
http://stackoverflow.com/questions/5343131/what-is-the-sessions-secret-option
*/

// Configuring Passport
app.use(expressSession({
  secret: 'mySecretKey', // secret is used to hash the session with HMAC
  resave: true, // TO REVISE
  saveUninitialized: false // TO REVISE
}));

app.use(passport.initialize());

// for persistent login sessions
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/root/router')(passport);
app.use('/', routes);

// Initialize routers here
var routers = require('./routes/routers');

// app.use('/', routers.root);
app.use('/library', routers.library);
app.use('/albums', routers.albums);
app.use('/artists', routers.artists);
app.use('/tracks', routers.tracks);
app.use('/users', routers.users);
app.use('/playlist', routers.users);

module.exports = app;
