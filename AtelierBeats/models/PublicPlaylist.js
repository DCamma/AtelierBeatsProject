'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var PublicPlaylistSchema = new mongoose.Schema(
  {
    name : { type: String, required: true },
    tracks : { type: [ObjectId], ref: "Track" },
    dateCreated : { type: Date, default: Date.now },
    publicPlaylyst : { type: Boolean, default: false },
    userId : {type: String, default: ""}
  }

);

//register model
mongoose.model('PublicPlaylist', PublicPlaylistSchema);
module.exports = PublicPlaylistSchema;
