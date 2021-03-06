/** @module users/router */
'use strict';

var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var User = mongoose.model('User');
var Activity = mongoose.model("Activity");
var Playlist = mongoose.model("Playlist");

var config = require("../../config");
var pubsub = require('../../pubsub');

var path = require("path");

// Code to manage upload of tracks
var multer = require('multer');
var uploadFolder = path.resolve(__dirname, "../../public/images/users");

function validPicFormat(trackMimeType) {
    // we could possibly accept other mimetypes...
    var mimetypes = ["image/gif", "image/png", "image/jpeg"];
    return mimetypes.indexOf(trackMimeType) > -1;
}

function userPicFileFilter(req, file, cb) {
    cb(null, validPicFormat(file.mimetype));
}

var userPicStorage = multer.diskStorage({
    // used to determine within which folder the uploaded files should be stored.
    destination: function(req, file, callback) {

        callback(null, uploadFolder);
    },

    filename: function(req, file, callback) {
        // req.body.name should contain the name of track
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: userPicStorage,
    fileFilter: userPicFileFilter
});

//fields we don't want to show to the client
var fieldsFilter = {
    'password': 0,
    '__v': 0
};

//supported methods
router.all('/publicPlaylists', middleware.supportedMethods('GET, POST, OPTIONS'));
router.all('/:userid/playlists', middleware.supportedMethods('GET, PUT, OPTIONS'));
router.all('/:userid', middleware.supportedMethods('GET, PUT, POST, DELETE, OPTIONS'));
router.all('/', middleware.supportedMethods('GET, POST, OPTIONS'));

//list users
router.get('/', function(req, res, next) {

    User.find({}, fieldsFilter).lean().exec(function(err, users) {
        if (err) return next(err);
        users.forEach(function(user) {
            addLinks(user);
        });

        res.json(users);
    });
});

// Get all public Playlists
router.get('/publicPlaylists', function(req, res, next) {
    var publicPlaylists = [];
    User.find({}, {}).lean().exec(function(err, users) {
        if (err) return next(err);
        users.forEach(function(user) {
            user.playlists.forEach(function(playlist) {
                if (playlist.publicPlaylist) {
                    publicPlaylists.push(playlist);
                }
            });
        });
        res.json(publicPlaylists);
    });
});

//create new user
router.post('/upload', upload.single("userPic"), function(req, res, next) {
    console.log("Uploaded file: ", req.file);
    res.redirect("/#user");
});

//get a user
router.get('/:userid', function(req, res, next) {
    User.findById(req.params.userid, fieldsFilter).lean().exec(function(err, user) {
        if (err) return next(err);
        if (!user) {
            res.status(404);
            res.json({
                statusCode: 404,
                message: "Not Found"
            });
            return;
        }
        addLinks(user);
        res.json(user);
    });
});

//update a user
router.put('/:userid', function(req, res, next) {
    var data = req.body;
    User.findById(req.params.userid, fieldsFilter, function(err, user) {
        if (err) return next(err);

        if (user) {
            user.userName = data.userName;
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            user.playlists = data.playlists;
            user.randomPlayback = data.randomPlayback;
            user.activities = data.activities;
            user.picture = data.picture || user.picture;

            if(data.password) user.password = data.password;

            console.log("New password: ", user.password)

            user.save(onModelSave(res));

        } else {
            //user does not exist create it
            var newUser = new User(data);
            newUser._id = ObjectId(req.params.userid);
            newUser.save(onModelSave(res, 201, true));
        }
    });
});

//remove a user
router.delete('/:userid', function(req, res, next) {
    User.findById(req.params.userid, fieldsFilter, function(err, user) {
        if (err) return next(err);
        if (!user) {
            res.status(404);
            res.json({
                statusCode: 404,
                message: "Not Found"
            });
            return;
        }
        user.remove(function(err, removed) {
            if (err) return next(err);
            res.status(204).end();
        })
    });
});

//get a user's playlists
router.get('/:userid/playlists', function(req, res, next) {
    User.findById(req.params.userid, fieldsFilter, function(err, user) {
        if (err) return next(err);
        if (!user) {
            res.status(404);
            res.json({
                statusCode: 404,
                message: "Not Found"
            });
            return;
        }
        res.json(user.playlists);
    });
});

//get a user's playlists' tracks
router.get('/:userid/playlists/:playlistsid', function(req, res, next) {
    User.findById(req.params.userid, fieldsFilter, function(err, user) {
        if (err) return next(err);
        if (!user) {
            res.status(404);
            res.json({
                statusCode: 404,
                message: "Not Found"
            });
            return;
        }
        for (var i = 0; i < user.playlists.length; i++) {
            if (user.playlists[i]._id == req.params.playlistsid) {
                res.json(user.playlists[i]);
                // console.log(user.playlists[i])
                return;
            }
        }
        res.json({
            statusCode: 404,
            message: "Not Found"
        });
        return;
    });
});

//update a user's playlists
router.put('/:userid/playlists', function(req, res, next) {

    var data = req.body;

    User.findById(req.params.userid, fieldsFilter, function(err, user) {
        if (err) return next(err);

        if (!user) {
            res.status(404);
            res.json({
                statusCode: 404,
                message: "Not Found"
            });
            return;
        }

        // Exercise 9
        if ((!data || !data.name) && !data.publicPlaylist) {
            data["name"] = "Playlist " + (user.playlists.length + 1)
        }

        var newPlaylist = new Playlist(data);
        user.playlists.push(newPlaylist);
        user.save(onModelSave(res));

    });

});

router.put('/:userid/playlists/:playlistsid', function(req, res, next) {
    var data = req.body;

    User.findById(req.params.userid, fieldsFilter, function(err, user) {
        if (err) return next(err);

        if (!user) {
            res.status(404);
            res.json({
                statusCode: 404,
                message: "Not Found"
            });
            return;
        }

        // console.log(user.playlists)

        for (var i = 0; i < user.playlists.length; i++) {
            if (user.playlists[i]._id == req.params.playlistsid) {
                if (data._id) {
                    if (user.playlists[i].tracks.indexOf(data._id) == -1) {
                        user.playlists[i].tracks.push(data._id)
                        user.save(onModelSave(res));
                        // console.log(user.playlists[i].tracks)

                        return;
                    }
                } else {
                    user.playlists[i].name = data.name;
                    if(data.publicPlaylist){user.playlists[i].publicPlaylist = data.publicPlaylist;}
                    if(data.userId){user.playlists[i].userId = data.userId;}
                    user.save(onModelSave(res));
                    return;
                }
            }
        }

        res.status(400);
        res.json({
            statusCode: 400,
            message: "Bad Request"
        });
    });

});

// Exercise 9 - Activities

router.get("/:userid/activities", function(req, res, next) {
    User.findById(req.params.userid, fieldsFilter, function(err, user) {
        if (err) return next(err);
        if (!user) {
            res.status(404);
            return res.json({
                statusCode: 404,
                message: "User Not Found"
            })
        }

        res.json(user.activities);
    })
});

/* Just creates a new activity with the data received. */
router.put("/:userid/activities", function(req, res, next) {

    var data = req.body;

    User.findById(req.params.userid, fieldsFilter, function(err, user) {
        if (err) return next(err);

        if (!user) {
            res.status(404);
            return res.json({
                statusCode: 404,
                message: "User Not Found"
            });
        } else {
            var activity = new Activity(data);
            user.activities.push(activity);
            pubsub.emit('activity.added', {});
            user.save(onModelSave(res));
        }

    });
});

/* Updates the activity with targetID=req.params.targetid, 
else a new activity document is created and stored to the db. */
router.put("/:userid/activities/:targetid", function(req, res, next) {

    var data = req.body;

    User.findById(req.params.userid, fieldsFilter, function(err, user) {
        if (err) return next(err);

        if (!user) {
            res.status(404);
            return res.json({
                statusCode: 404,
                message: "User Not Found"
            });
        } else { // user exits
            var found = false;

            for (var i = 0; i < user.activities.length && !found; i++) {

                if (user.activities[i].targetID == req.params.targetid) {

                    user.activities[i].action = data.action || user.activities[i].action;
                    user.activities[i].target = data.target || user.activities[i].target;
                    user.activities[i].timestamp = data.timestamp || user.activities[i].timestamp;
                    user.activities[i].url = data.url || user.activities[i].url;

                    found = true;
                }
            }

            if (!found) {
                var activity = new Activity(data);
                user.activities.push(activity);
            }

            pubsub.emit('activity.added', {});
            user.save(onModelSave(res));
        }

    });
});


function onModelSave(res, status, sendItAsResponse) {
    var statusCode = status || 204;
    var sendItAsResponse = sendItAsResponse || false;

    return function(err, saved) {
        if (err) {
            if (err.name === 'ValidationError' || err.name === 'TypeError') {
                res.status(400)
                return res.json({
                    statusCode: 400,
                    message: "Bad Request"
                });
            } else {
                return next(err);
            }
        }
        if (sendItAsResponse) {
            var obj = saved.toObject();
            delete obj.password;
            delete obj.__v;
            addLinks(obj);
            res.status(statusCode)
            return res.json(obj);
        } else {
            return res.status(statusCode).end();
        }
    }
}

function addLinks(user) {
    user.links = [{
        "rel": "self",
        "href": config.url + "/users/" + user._id
    }, {
        "rel": "playlists",
        "href": config.url + "/users/" + user._id + "/playlists"
    }];
}

/** router for /users */
module.exports = router;