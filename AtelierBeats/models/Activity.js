/** 
 * The Activity Model
 * Schema:
 * _id           String       required   unique identifier of the activity.
 * timestamp      
 * action  
 *          here are the following actions to track and their corresponding target object:
 *              - track playback (play, track URL)
 *              - create new playlist (create_playlist, playlistURL)
 *              - delete track (delete_track, no trarget object)
 *  
 * target 
 */

'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ActivitySchema = new mongoose.Schema({
  action: {
    type: String, // for now lets use just a string...
    required: true
  },
  target: {
    type: String, // name of the target object on the action
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String,
    required: true
  },
  targetID: {
    type: String,
    required: true
  }
});

//register model
mongoose.model('Activity', ActivitySchema);
