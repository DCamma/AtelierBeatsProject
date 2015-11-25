/* Global variables */
var currentTracks;
var currentArtists;
var currentAlbums;
var count = true;
var playlistLeftIcons = {}; // helpful for editing the playlist name
var addPlaylistCreationActivity = false; // Used to update the default activity when a playlist is created

/* Setup on Page Load */
window.onload = function() {

  bindMenu();

  updatePage();

  setupPlaylists();

  setupSearch();

  setupSyncCheckbox();

}

function setupSyncCheckbox() {
  var checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.id = "syncCheck";
  document.getElementById("pl-volume").appendChild(checkbox);
}

function incrementCounter(counter, trackId) {
  doJSONRequest("GET", "/tracks/" + trackId, null, null, function(track) {
    incCounter = {};
    incCounter[counter] = track[counter] + 1;
    doJSONRequest("PUT", "/tracks/" + trackId, null, incCounter, null);
  });
}

function bindMenu() {
  var menu = document.querySelectorAll("#main-menu > li > a");

  for (var elem = 0; elem < menu.length; ++elem) {
    //console.log(menu[elem])
    if (menu[elem].getAttribute("href").indexOf("library.html") > -1) {
      menu[elem].onclick = function(e) {
        drawLibrary(e);
        // setupPlayer();
      }
    } else if (menu[elem].getAttribute("href").indexOf("artists.html") > -1) {
      menu[elem].onclick = drawArtists;
    } else if (menu[elem].getAttribute("href").indexOf("albums.html") > -1) {
      menu[elem].onclick = drawAlbums;
    } else if (menu[elem].getAttribute("href").indexOf("activities.html") > -1) {
      menu[elem].onclick = drawActivities;
    }

  }
}

/* EXERCISE 9 - Activities */
function drawActivities(e, addHistory) {

  if (e && e.target) {
    e.preventDefault();
  }

  var href = "/users/564dcfa513dce9ec91e501d2/activities";

  addActivitiesToHistory(addHistory);

  // A user has a static id used for tests...
  doJSONRequest("GET", href, null, null, renderActivities);

  function renderActivities(activities) {

    // sort activities by timestamp
    activities.sort(function(a, b) {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    activities = activities.slice(0, 25); // show only first 25 activities

    // Adding a property to all objects in the activities 
    // representing their respective position in the UI view
    for (var i = 0; i < activities.length; i++) {
      activities[i].n = i + 1;
      activities[i].timestamp = formatTimestamp(new Date(activities[i].timestamp));
    }

    var data = {
      "activities": activities
    }

    dust.render("activities", data, function(err, out) {
      var content = document.getElementById("content");
      content.innerHTML = out;

      document.onclick = function(e) {

        if (e.target.classList.contains("activity-row")) {
          if (e) e.preventDefault();

          var dataURL = e.target.getAttribute("data-url");
          var playlistId = dataURL.substr(dataURL.lastIndexOf("/")).replace("/", "");

          if (dataURL) {

            doJSONRequest("GET", dataURL, null, null, function(d) {

              if (dataURL.indexOf("playlists") > -1) {
                drawPlaylist(null, null, null, playlistId); // passing the id of the playlist to draw

              } else if (dataURL.indexOf("tracks") > -1) {
                drawLibrary();
              }
              console.log("GET request to the activity finished.");
            });
          }

        }
      }

    });

  }

}

//<!-- /build -->

/* UI */

/* Library */

function drawLibrary(e, addHistory, preventBind, foundedTracks) {

  if (e && e.target) {
    e.preventDefault();
  }

  addLibraryToHistory(addHistory);

  doJSONRequest("GET", "/albums", null, null, function(albums) {
    currentAlbums = albums;
    doJSONRequest("GET", "/artists", null, null, function(artists) {
      currentArtists = artists;
      //execute the AJAX call to the get tracks
      doJSONRequest("GET", "/tracks", null, null, renderTracks);
    });
  });

  function renderTracks(tracks) {

    currentTracks = tracks;

    if (foundedTracks) {
      var tracksData = buildTracksData(foundedTracks);
    } else {
      var tracksData = buildTracksData(tracks);
    }

    var data = {
      "tracks": tracksData
    };

    dust.render("tracks", data, function(err, out) {

      var content = document.getElementById("content");
      content.innerHTML = out;

      bindAlbumLink();

      bindArtistLink();

      bindTracksDelete();

      bindEditTrackName();

      if (document.getElementsByTagName('audio').length === 0) {
        setupPlayer();
      }

      // The following if statement prevent the creation of more then one event listener
      if (!preventBind) {

        /* 
        Exercise 9 - doing a put request to sign the activity 
        when the user click on the name of a song.
        */

        //add one event listener for all tracks using event delegation
        document.onclick = function(event) {

          if (event.target.classList.contains('fl-tl-file-link')) {
            // prevent anchor element from following link
            event.preventDefault();

            var trackId = event.target.dataset.tid;

            playTrackById(trackId)

            var userActivity = {
              "action": "Track Playback",
              "url": "/tracks/" + trackId,
              "target": event.target.innerHTML
            }

            doJSONRequest("PUT", "/users/564dcfa513dce9ec91e501d2/activities", null, userActivity, function() {
              console.log("doJSONRequest finished for a PUT on track click");
            });

          }

        }

      }

    });

  }
}

function buildTracksData(tracks) {

  var tracksData = [];

  for (track in tracks) {

    var newTracksData = {};
    newTracksData.artist = {};
    newTracksData.album = {};

    newTracksData.name = tracks[track].name;
    newTracksData._id = tracks[track]._id;
    newTracksData.duration = formatTime(tracks[track].duration);

    newTracksData.artist._id = tracks[track].artist._id;
    newTracksData.artist.name = tracks[track].artist.name;

    newTracksData.album._id = tracks[track].album._id;
    newTracksData.album.name = tracks[track].album.name;
    newTracksData.album.artwork = tracks[track].album.artwork;

    // Need this three lines to dosplay the counters in the dust view
    newTracksData.count_start = tracks[track].count_start;
    newTracksData.count_middle = tracks[track].count_middle;
    newTracksData.count_end = tracks[track].count_end;

    tracksData.push(newTracksData);

  }
  return tracksData;

}

function addLibraryToHistory(addHistory) {
  if ((("undefined" == typeof addHistory) || (addHistory === null)) || addHistory == true) {

    var state = {
      'function': 'drawLibrary'
    };

    addToHistory(JSON.stringify(state), "/#library");
  }
}

// Exercise 9
function addActivitiesToHistory(addHistory) {
  if ((("undefined" == typeof addHistory) || (addHistory === null)) || addHistory == true) {

    var state = {
      'function': 'drawActivities'
    };

    addToHistory(JSON.stringify(state), "/#activities");
  }
}

function bindTracksDelete() {
  var tracks = document.querySelectorAll(".fl-tl-delete a");

  for (var elem = 0; elem < tracks.length; ++elem) {
    tracks[elem].onclick = deleteTrack;
  }
}

function deleteTrack(e) {

  var href;
  var target = e.target;

  if (e && e.target) {
    e.preventDefault();
    href = target.getAttribute("href");
  }

  // name of the track to be deleted
  var trackName = target.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML;
  var trackId = target.parentNode.parentNode.id; // not needed for now

  //execute the AJAX call to the delete a single album
  doJSONRequest("DELETE", href, null, null, removeTrack);

  // Exercise 9
  var userActivity = {
    "action": "Track Deletion",
    "url": "/tracks/" + trackId,
    "target": trackName
  }

  doJSONRequest("PUT", "/users/564dcfa513dce9ec91e501d2/activities", null, userActivity, function() {
    console.log("doJSONRequest finished for a PUT on track deletion");
  });

  function removeTrack() {

    var toDelete = target.parentNode.parentNode;
    var parent = document.getElementById("tracks-list");

    parent.removeChild(toDelete);

  }

}

function bindEditTrackName() {

  var tracksName = document.querySelectorAll("#tracks-list > div > div.fl-tl-name > span + .edit-btn");
  for (var elem = 0; elem < tracksName.length; ++elem) {
    tracksName[elem].onclick = editTrackName;
  }

}

function editTrackName(e) {

  if (e && e.target) {
    e.preventDefault();
  }

  var target = e.target;
  var editable = target.previousSibling;

  if (editable.contentEditable == "false" || editable.contentEditable == "inherit") { //we have to enable the editing

    editable.contentEditable = "true";
    editable.className = "pl-name-editing";

    removeClass(target.firstChild, "fa-pencil");
    removeClass(target.firstChild, "fl-tl-pencil");

    addClass(target.firstChild, "fa-check");
    addClass(target.firstChild, "fl-tl-check");

    //set the cursor on the editable element
    var s = window.getSelection(),
      r = document.createRange();
    r.setStart(editable, 0);
    r.setEnd(editable, 0);
    s.removeAllRanges();
    s.addRange(r);

  } else { //we have to save the modified name

    var href = editable.getAttribute("href");

    //send the data to the server
    var newName = editable.innerText;

    var updatedTrack = {
      'name': newName
    }

    doJSONRequest("PUT", href, null, updatedTrack, disableEditing);

    function disableEditing() {

      editable.contentEditable = "false";
      editable.className = "pl-name";

      removeClass(target.firstChild, "fa-check");
      removeClass(target.firstChild, "fl-tl-check");

      addClass(target.firstChild, "fa-pencil");
      addClass(target.firstChild, "fl-tl-pencil");

    }

  }

}

/* Library */

/* Artists */

function drawArtists(e, addHistory) {
  if (e && e.target) {
    e.preventDefault();
  }

  addArtistsToHistory(addHistory);

  //execute the AJAX call to get the artists
  doJSONRequest("GET", "/artists", null, null, renderArtists);

  function renderArtists(artists) {
    //create the data object with the structure expected by the compiled view
    var data = {
      "artists": artists
    }

    dust.render("artists", data, function(err, out) {

      var content = document.getElementById("content");

      content.innerHTML = out;

      bindArtistLink();

      bindArtistDelete();

    });

  }

}

function addArtistsToHistory(addHistory) {
  if ((("undefined" == typeof addHistory) || (addHistory === null)) || addHistory == true) {
    var state = {
      'function': 'drawArtists'
    };

    addToHistory(JSON.stringify(state), "/#artists");
  }
}

function drawArtist(e, addHistory) {

  var href;

  if (e && e.target) {
    e.preventDefault();
    href = e.target.getAttribute("href");
  } else {
    href = e;
  }

  addArtistToHistory(href, addHistory)

  //execute the AJAX call to the get a single artist
  doJSONRequest("GET", href, null, null, renderArtist);

  function renderArtist(artist) {

    //we need the artist's tracks
    doJSONRequest("GET", "/tracks?filter=" + encodeURIComponent(JSON.stringify({
      'artist': artist._id
    })), null, null, renderShowArtist);

    function renderShowArtist(tracks) {
      currentTracks = tracks
      var artistData = [];
      var artistTracks = buildTracksData(tracks);

      artistData.artwork = artist.artwork;
      artistData._id = artist._id;
      artistData.name = artist.name;
      artistData.genre = artist.genre;

      var data = {
        "artist": artistData,
        "tracks": artistTracks
      };

      dust.render("artist", data, function(err, out) {

        var content = document.getElementById("content");

        content.innerHTML = out;

        bindArtistLink();

        bindAlbumLink();

        bindTracksDelete();

        bindEditTrackName();

      });
    }

  }
}

function addArtistToHistory(href, addHistory) {
  if ((("undefined" == typeof addHistory) || (addHistory === null)) || addHistory == true) {
    var state = {
      'function': 'drawArtist',
      'href': href
    };

    addToHistory(JSON.stringify(state), "/#" + href);
  }
}

function bindArtistLink() {
  var artists = document.querySelectorAll(".artist-link");

  for (var elem = 0; elem < artists.length; ++elem) {
    //console.log(artists[elem])
    artists[elem].onclick = drawArtist;
  }
}

function bindArtistDelete() {
  var artists = document.querySelectorAll(".delete-btn");

  for (var elem = 0; elem < artists.length; ++elem) {
    //console.log(albums[elem])
    artists[elem].onclick = deleteArtist;
  }
}

function deleteArtist(e) {

  var href;
  var target = e.target;

  if (e && e.target) {
    e.preventDefault();
    href = target.getAttribute("href");
  }

  //execute the AJAX call to the delete a single album
  doJSONRequest("DELETE", href, null, null, removeArtist);

  function removeArtist() {

    //console.log(responseText);
    //console.log(target);

    var toDelete = target.parentNode.parentNode;
    var parent = document.getElementById("artists-list");

    parent.removeChild(toDelete);

  }

}

/* Artists */

/* Albums */

function drawAlbums(e, addHistory, onlyFavourites, favDomColor) {
  if (e && e.target)
    e.preventDefault();

  addAlbumsToHistory(addHistory);

  //execute the AJAX call to the get albums
  doJSONRequest("GET", "/albums", null, null, renderAlbums);

  function renderAlbums(albums) {
    var albumData = [];

    for (album in albums) {

      var newAlbumData = {};
      newAlbumData.artist = {};

      newAlbumData.artwork = albums[album].artwork;
      newAlbumData._id = albums[album]._id;
      newAlbumData.name = albums[album].name;
      newAlbumData.artist._id = albums[album].artist._id;
      newAlbumData.artist.name = albums[album].artist.name;
      newAlbumData.checked = albums[album].checked;

      albumData.push(newAlbumData);
    }

    if (onlyFavourites) {
      var favAlbums = [];
      for (var i = 0; i < albumData.length; i++) {
        if (albumData[i].checked == true) {
          favAlbums.push(albumData[i]);
        }
      }
      var data = {
        "albums": favAlbums
      }
    } else {
      var data = {
        "albums": albumData
      }
    }

    dust.render("albums", data, function(err, out) {

      var content = document.getElementById("content");

      content.innerHTML = out;

      bindAlbumLink();

      bindAlbumDelete();

      bindAlbumLike();

      bindArtistLink();

      var favDom = document.querySelectorAll(".like-filter")[0];
      favDom.childNodes[0].onclick = onFavouritesClick
      favDom.style.backgroundColor = favDomColor;

      var albums = document.querySelectorAll(".like-btn");

      for (var i = 0; i < data.albums.length; i++) {
        if (data.albums[i].checked == true) {
          albums[i].style.backgroundColor = "#a44b4d"; // that red
        } else {
          albums[i].style.backgroundColor = "#605F61";
        }
      }

    });

  }

}

function onFavouritesClick(e) {
  if (!count) {
    drawAlbums(null, false, false, "#605F61");
    count = !count;
  } else {
    drawAlbums(null, false, true, "#a44b4d")
    count = !count;
  }
}

function addAlbumsToHistory(addHistory) {
  if ((("undefined" == typeof addHistory) || (addHistory === null)) || addHistory == true) {
    var state = {
      'function': 'drawAlbums'
    };

    addToHistory(JSON.stringify(state), "/#albums");
  }
}

/* Album */

function drawAlbum(e, addHistory) {
  var href;

  if (e && e.target) {
    e.preventDefault();
    href = e.target.getAttribute("href");
  } else {
    href = e;
  }

  addAlbumToHistory(href, addHistory);

  //console.log(target.getAttribute("href"));

  //execute the AJAX call to the get a single album
  doJSONRequest("GET", href, null, null, renderAlbum);

  function renderAlbum(album) {

    //we need the album's tracks
    doJSONRequest("GET", "/tracks?filter=" + encodeURIComponent(JSON.stringify({
      'album': album._id
    })), null, null, renderShowAlbum);

    function renderShowAlbum(tracks) {
      currentTracks = tracks
      var albumData = [];
      var albumTracks = buildTracksData(tracks);

      albumData.artist = {};

      albumData.artwork = album.artwork;
      albumData._id = album._id;
      albumData.name = album.name;
      albumData.label = album.label;
      albumData.dateReleased = album.dateReleased.split("T")[0];
      albumData.artist._id = album.artist._id;
      albumData.artist.name = album.artist.name;

      var data = {
        "album": albumData,
        "tracks": albumTracks
      };

      dust.render("album", data, function(err, out) {

        var content = document.getElementById("content");

        content.innerHTML = out;

        bindAlbumLink();

        bindArtistLink();

        bindTracksDelete();

        bindEditTrackName();

      });

    }

  }
}

function addAlbumToHistory(href, addHistory) {
  if ((("undefined" == typeof addHistory) || (addHistory === null)) || addHistory == true) {
    var state = {
      'function': 'drawAlbum',
      'href': href
    };

    addToHistory(JSON.stringify(state), "/#" + href);
  }
}

function bindAlbumLink() {
  var albums = document.querySelectorAll(".album-link");

  for (var elem = 0; elem < albums.length; ++elem) {
    //console.log(albums[elem])
    albums[elem].onclick = drawAlbum;
  }
}

function bindAlbumDelete() {
  var albums = document.querySelectorAll(".delete-btn");

  for (var elem = 0; elem < albums.length; ++elem) {
    //console.log(albums[elem])
    albums[elem].onclick = deleteAlbum;
  }
}

function deleteAlbum(e) {

  var href;
  var target = e.target;

  if (e && e.target) {
    e.preventDefault();
    href = target.getAttribute("href");
  }

  //execute the AJAX call to the delete a single album
  doJSONRequest("DELETE", href, null, null, removeAlbum);

  function removeAlbum() {

    var toDelete = target.parentNode.parentNode;
    var parent = document.getElementById("albums-list");

    parent.removeChild(toDelete);

  }

}

function bindAlbumLike() {
  var albums = document.querySelectorAll(".like-btn");
  for (var elem = 0; elem < albums.length; ++elem) {
    albums[elem].onclick = likeAlbum;
  }
}

function likeAlbum(e) {

  var href;
  var target = e.target;

  if (e && e.target) {
    e.preventDefault();
    href = target.getAttribute("href");
  }

  doJSONRequest("GET", href, null, null, renderAlbum);

  function renderAlbum(album) {

    //we need the album's tracks
    doJSONRequest("GET", "/tracks?filter=" + encodeURIComponent(JSON.stringify({
      'album': album._id
    })), null, null, renderShowAlbum);

    function renderShowAlbum(tracks) {

      var albumData = {};
      var albumTracks = buildTracksData(tracks);
      albumData.artist = {};

      albumData.artwork = album.artwork;
      albumData._id = album._id;
      albumData.name = album.name;
      albumData.label = album.label;
      albumData.dateReleased = album.dateReleased.split("T")[0];
      albumData.artist._id = album.artist._id;
      albumData.artist.name = album.artist.name;
      albumData.checked = !(album.checked);

      doJSONRequest("PUT", href, null, albumData, checkLikedAlbum);

      var toCheck = target.parentNode.parentNode;

      if (album.checked == false) {
        toCheck.childNodes[1].style.backgroundColor = "#a44b4d";
      } else {
        toCheck.childNodes[1].style.backgroundColor = "#605F61";
      }

      function checkLikedAlbum() {

      }
    }
  }
}
/* Album */

/* Albums */

/* UI */

/* History Navigation */

/*
 * The addToHistory function push the @param{state} and the @param{url} in the history State
 *
 * @param {JSON String} state The current state of the search form's button
 * @param {String} url The current url as long with the hash
 */
function addToHistory(state, url) {
  history.pushState(state, null, url);
  //console.log("Added to history: " + url + ", state: " + state);
}

/*
 * The updatePage function handles the update of the page when an onpopstate or onload event is fired.
 * The function gets the hash and the current state, calls the ajaxFind function to update the view
 * and update the form's input value with the data retrieved from the hash
 *
 * @param {JSON String} state The current state of the search form's button
 * @param {String} url The current url as long with the hash
 */
function updatePage(event) {

  //get reference to the hash and to the current state
  var hash = document.location.hash;

  var playlistId = hash.split('/')[1]
  if (event && event.state)
    var currentState = JSON.parse(event.state);

  console.log("Hash: " + hash);
  console.log("Current State: " + currentState);
  if (currentState) {

    if (currentState.function == 'drawLibrary')
      drawLibrary(null, false);
    else if (currentState.function == 'drawArtist')
      drawArtist(currentState.href, false);
    else if (currentState.function == 'drawAlbum')
      drawAlbum(currentState.href, false);
    else if (currentState.function == 'drawAlbums')
      drawAlbums(null, false);
    else if (currentState.function == 'drawArtists')
      drawArtists(null, false);

  } else if (hash) {

    if (hash.indexOf("library") > -1)
      drawLibrary(null, false);

    else if (hash.indexOf("#artists/") > -1)
      drawArtist(hash.replace("#", ""), false);

    else if (hash.indexOf("artists") > -1)
      drawArtists(null, false);

    else if (hash.indexOf("#albums/") > -1)
      drawAlbum(hash.replace("#", ""), false);

    else if (hash.indexOf("albums") > -1)
      drawAlbums(null, false);

    else if (hash.indexOf("#playlist/" + playlistId) > -1) {
      drawPlaylist(null, null, false, playlistId);

    } else if (hash.indexOf("#activities/") > -1 || hash.indexOf("activities")) {
      drawActivities(null, false)
    }

  } else {
    drawLibrary(null, false);
  }

}

//bind the window onpopstate event to the updatePage function
window.onpopstate = updatePage;

/* History Navigation */

/* Search */

function setupSearch() {
  var searchBox = document.getElementById("main-search");
  searchBox.addEventListener("input", function() {
    var split = this.value.split(" ");
    var result = []
    var theValue = this.value
    doJSONRequest("GET", "/tracks", null, null, function(tracks) {
      result = fuzzyFind(tracks, "name", theValue);

      if (theValue.trim() === "") {
        drawLibrary();
        return;
      }

      drawLibrary(null, null, true, result)
    })
  });
}

function find(arr, prop, val) {
  var res = [];
  arr.forEach(function(item) {
    if ("undefined" !== item[prop] && item[prop] === val) {
      res.push(item)
    }
  });
  return res;
}

function findOne(arr, prop, val) {
  for (var i = 0, l = arr.length; i < l; i++) {
    var item = arr[i];
    if ("undefined" !== item[prop] && item[prop] === val) {
      return item;
    }
  }
}

function findFirstAlbumInCollection(model, prop, array) {
  for (var key in array) {
    for (var i = 0, l = model.length; i < l; i++) {
      var item = model[i];
      if ("undefined" !== item[prop] && item[prop] === array[key]) {
        return item;
      }
    }
  }

  return undefined
}

/* Search */

function setupPlaylists() {

  doJSONRequest("GET", "users/564dcfa513dce9ec91e501d2/playlists", null, null, renderPlaylists);

  function renderPlaylists(playlists) {
    var data = {
      "playlists": playlists
    };

    dust.render("playlists", data, function(err, out) {
      document.getElementById('playlists').innerHTML = out;

      bindPlaylistNameClick();

      bindNewPlaylist(); // Exercise 9

      bindEditPlaylistName();
    });

  }

  function bindEditPlaylistName() {

    var playlistsName = document.querySelectorAll("#playlists > li > .pl-name + .edit-btn");

    for (var elem = 0; elem < playlistsName.length; ++elem) {
      playlistsName[elem].onclick = editPlaylistName;
    }

    function editPlaylistName(e) {

      if (e && e.target) {
        e.preventDefault();
      }

      var editButton = e.target;
      managePlaylistNameEdit(editButton);

    }

  }

  function bindPlaylistNameClick() {
    var menu = document.querySelectorAll("#playlists > li");

    for (var elem = 0; elem < menu.length; ++elem) {

      menu[elem].onclick = function(e) {
        drawPlaylist(e, null, true);
      }
    }
  }

  // Exercise 9
  function bindNewPlaylist() {
    var newPlaylistButton = document.getElementById("create-pl-btn");
    newPlaylistButton.onclick = createPlaylist;

    function createPlaylist(e) {
      if (e && e.target) {
        e.preventDefault();
      }

      // Initially stores a default playlist to the server
      doJSONRequest("PUT", "/users/564dcfa513dce9ec91e501d2/playlists", null, {}, function() {

        doJSONRequest("GET", "users/564dcfa513dce9ec91e501d2/playlists", null, null, function(data) {

          renderPlaylists(data);

          var lastPlaylistDOM = document.getElementById("playlists").lastChild;
          var lastPlaylistDOMId = lastPlaylistDOM.id;
          var lastPlaylistDOMName = lastPlaylistDOM.firstChild.lastChild.innerHTML;
          var editButton = lastPlaylistDOM.childNodes[1];

          // Stores the activity of a playlist creation into the server
          var userActivity = {
            "action": "Playlist Creation",
            "url": "/users/564dcfa513dce9ec91e501d2/playlists/" + lastPlaylistDOMId,
            "target": lastPlaylistDOMName
          }

          doJSONRequest("PUT", "/users/564dcfa513dce9ec91e501d2/activities", null, userActivity, function() {
            console.log("doJSONRequest finished for a PUT on playlist creation");

            /* This variable is used in the case the user 
            updates the default name  of the just created playlist.
            If set to true, another PUT request is made to update the name chosen by the user. */
            addPlaylistCreationActivity = true;

            managePlaylistNameEdit(editButton);

          });

        });
      });

    }

  }

}

/* 
 * This function is responsible for managing each playlist's name edit.
 * It is called either when a new playlist is created 
 * or when the user clicks to edit a playlist's name.
 * 
 * A PUT request for storing an activity on the server
 * is done whenever a new playlist is created.
 */
function managePlaylistNameEdit(editButton) {

  var editable = editButton.previousSibling;

  if (editable.childNodes.length == 2) {
    playlistLeftIcons[editable] = editable.firstChild;
  }

  if (editable.contentEditable == "false" || editable.contentEditable == "inherit") { // we have to enable the editing

    editable.removeChild(playlistLeftIcons[editable]);
    editable.contentEditable = "true";
    editable.style.paddingLeft = "20px";
    editable.className = "pl-name-editing";

    removeClass(editButton.firstChild, "fa-pencil");
    removeClass(editButton.firstChild, "fl-tl-pencil");

    addClass(editButton.firstChild, "fa-check");
    addClass(editButton.firstChild, "fl-tl-check");

    //set the cursor on the editable element
    var s = window.getSelection(),
      r = document.createRange();
    r.setStart(editable, 0);
    r.setEnd(editable, 0);
    s.removeAllRanges();
    s.addRange(r);

  } else { //we have to save the modified name

    var id = editable.parentNode.getAttribute("id");

    //send the data to the server
    var newName = editable.innerText;

    var updatedPlaylist = {
      "name": newName,
      "id": id
    }

    doJSONRequest("PUT", "/users/564dcfa513dce9ec91e501d2/playlists/" + id, null, updatedPlaylist, disableEditing);

    function disableEditing() {

      editable.insertBefore(playlistLeftIcons[editable], editable.firstChild);
      editable.contentEditable = "false";
      editable.style.paddingLeft = "0";
      editable.className = "pl-name";

      removeClass(editButton.firstChild, "fa-check");
      removeClass(editButton.firstChild, "fl-tl-check");

      addClass(editButton.firstChild, "fa-pencil");
      addClass(editButton.firstChild, "fl-tl-pencil");

      if (addPlaylistCreationActivity) {
        var updatedActivity = {
          "action": "Playlist Creation",
          "url": "/users/564dcfa513dce9ec91e501d2/playlists/" + id,
          "target": newName
        }

        doJSONRequest("PUT", "/users/564dcfa513dce9ec91e501d2/activities", null, updatedActivity, function() {
          console.log("Activity with url '" + "/users/564dcfa513dce9ec91e501d2/playlists/" + id + "' updated.")
          addPlaylistCreationActivity = false;
        });
      }

    }

  }
}

/*
 * pId was added in order to draw the correct playlist 
 * when we click on the activity creation of the same,
 * since e and e.target are different from those 
 * when you click directly on the playlist name from the menu.
 */
function drawPlaylist(e, addHistory, preventBind, pId) {
  var playlistId;
  var target;

  if (!pId) { // if the pId is not already provided
    target = e.target;
    // if the user only clicks on the edit button, the playlist should not be drawn.
    if (target.className == "edit-btn") return;

    if (e && e.target) {
      e.preventDefault();
      playlistId = target.getAttribute("id");
    }

  } else {
    playlistId = pId;
  }

  addPlaylistToHistory(addHistory, playlistId)

  doJSONRequest("GET", "/users/564dcfa513dce9ec91e501d2/playlists/" + playlistId, null, null, renderPlayTracks);

  function renderPlayTracks(playlist) {

    var tracks = []

    if (playlist.tracks.length == 0) {
      renderPlaylist({
        "playlist": playlist
      })
    } else {
      for (var i = 0; i < playlist.tracks.length; i++) {
        doJSONRequest("GET", "tracks/" + playlist.tracks[i], null, null, getTracks)
      }
      currentTracks = tracks
    }

    function renderPlaylist(data) {
      dust.render("playlist", data, function(err, out) {
        var content = document.getElementById("content");
        content.innerHTML = out;
        var a = document.getElementById("tracks-list")
        Sortable.create(a, {})
        generatePlaylistArtwork(data)

        bindAlbumLink();

        bindArtistLink();

        bindTracksDelete();

        bindEditTrackName();

        if (document.getElementsByTagName('audio').length === 0) {
          setupPlayer();
        }

        // The following if statement prevent the creation of more then one event listener
        if (!preventBind) {

          // Does not happen when clicked from the activities view.
          //add one event listener for all tracks using event delegation
          document.addEventListener('click', function(event) {
            if (event.target.classList.contains('fl-tl-file-link')) {
              // prevent anchor element from following link
              event.preventDefault();

              playTrackById(event.target.dataset.tid)
            }
          })
        }

      });

    }

    function getTracks(track) {
      tracks.push(track);
      console.log(track)
      var formTracks = buildTracksData(tracks);

      for (var i = 0; i < formTracks.length; i++) {
        playlist.trackMsg = (formTracks && formTracks.length) ? formTracks.length + ' tracks' : '0 tracks';
      }

      var data = {
        "tracks": formTracks,
        "playlist": playlist
      }

      renderPlaylist(data);

    }
  }

}

function emptyPlaylistArtwork() {
  var canvas = document.getElementById('playlistArtworkCanvas')
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = "#F0F0F0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
}

function generatePlaylistArtwork(data) {
  var canvas = document.getElementById('playlistArtworkCanvas')
  var ctx = canvas.getContext('2d')

  emptyPlaylistArtwork()

  var w2 = canvas.width / 2
  var h2 = canvas.height / 2
  var images = get4PlaylistImages(data)

  for (var i in images) {

    var tempImage = new Image()
    tempImage.pos = i
    tempImage.onload = function(evt) {
        var pos = this.pos
        var x = (pos / 2 >= 1) ? w2 : 0;
        var y = (pos % 2 == 1) ? h2 : 0;
        ctx.drawImage(evt.target, x, y, w2, h2);
      }
      //load image
    tempImage.src = images[i];
  };
}

function get4PlaylistImages(data) {

  if (!data.tracks || !data.tracks.length) return;

  var artworks = [];
  for (var i = 0; i < data.tracks.length; i++) {
    if (artworks.length == 4) return artworks;

    artworks.push(data.tracks[i].album.artwork);
  }
  return artworks;

}

function addPlaylistToHistory(addHistory, playlistId) {
  if ((("undefined" == typeof addHistory) || (addHistory === null)) || addHistory == true) {
    var state = {
      'function': 'drawPlaylist'
    };

    addToHistory(JSON.stringify(state), "/#playlist/" + playlistId);
  }
}

function allowDrop(evt) {
  evt.preventDefault();
}

function drag(evt) {
  evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
}

function drop(evt) {
  evt.preventDefault();
  var trackId = evt.dataTransfer.getData("text/plain");
  var playlistId = evt.currentTarget.id
  addTrackToPlaylist(playlistId, trackId)
}

function addTrackToPlaylist(playlistId, trackId) {
  doJSONRequest("GET", "/tracks/" + trackId, null, null, addTrack);

  function addTrack(track) {
    doJSONRequest("PUT", "users/564dcfa513dce9ec91e501d2/playlists/" + playlistId, null, track, function() {});
  }
}


/* Player */

/**
 * This function setups the player. More specifically:
 * - It should create an audio element and append it in the body
 *
 * - The audio element should load by default the first track of your library
 *
 * - When the track is paused and you click on the play button of exercise one,
 *   it should play the current track and switch the icon of the button to 'pause'.
 *   You don't need to use the checkbox hack for toggling the icons. You might as well
 *   use Javascript.
 *
 * - When the track is playing and you click on the pause button of exercise one,
 *   it should pause the current track and switch the icon of the button to 'pause'.
 *
 *
 * Optionally:
 * - When the track is playing the progress bar should be updated to reflect the progress
 *
 * - When the progress bar is clicked the current time of the player should skip to
 *  the corresponding time (that is, if the click was on the 2/3 of the total width
 *  of the bar, the track current time should be the 2/3 of the total duration). Also
 *  the progress bar should be updated.
 *
 * - As the track is playing the elapsed time should be updated
 *
 * - Implement a volume bar that does what the progress bar does for sound but for volume.
 *
 * - When a track is clicked from the library, your player should start playing it
 *
 * - When a track finishes your player should play the next one
 */

function updatePlayer(data) {
  syncCheck = document.getElementById("syncCheck").checked
  if (document.getElementsByTagName('audio').length !== 0 && data && syncCheck) {
    if (data.data.currentTime) {
      audio.currentTime = data.data.currentTime;
    }
    if (data.data.playButton && data.data.playButton == 'play') {
      play()
    }
    if (data.data.playButton && data.data.playButton == 'pause') {
      pause()
    }
  }
}

checkFirstTime = true;

function setupPlayer(data) {
  if (data && data.trackId) {
    currentTrackId = data.trackId;
    // currentTime = data.currentTime;
    // currentState = data.currentState;
  } else {
    currentTrackId = currentTracks[0]._id;
  }
  if (document.getElementsByTagName('audio').length !== 0) {
    audio.remove()
  }
  // Buttons
  var playButton = document.getElementById("play-pause");
  var muteButton = document.getElementById("mute");
  var fullScreenButton = document.getElementById("full-screen");
  var volumeOff = document.getElementById("volume-off");
  var volumeUp = document.getElementById("volume-up");
  var nextButton = document.getElementById("next");
  var previousButton = document.getElementById("previous");

  // Sliders
  var seekRail = document.getElementById("pl-timeline-rail");
  var seekBar = document.getElementById("pl-timeline-bar");
  var volumeRail = document.getElementById("pl-volume-rail");
  var volumeBar = document.getElementById("pl-volume-bar");

  //Labels
  var timeElapsed = document.getElementById("time-elapsed");
  var timeTotal = document.getElementById("time-total");

  // Audio element
  audio = document.createElement('audio');

  // every time the metadata are loaded for a track update the progress bar
  audio.addEventListener("loadedmetadata", function() {
    //set total time
    timeTotal.innerHTML = formatTime(Math.floor(audio.duration));

    //set volume
    volumeBar.style.width = (audio.volume * 100) + "%";
  });

  document.body.appendChild(audio);

  playTrackById(currentTrackId);

  // Event listener for the play/pause button
  playButton.addEventListener("click", function() {
    if (audio.paused == true) {
      play()
      currentData = {
        'playButton': 'play',
      }
      doJSONRequest('PUT', "/tracks/player", null, currentData, null);
    } else {
      pause()
      currentData = {
        'playButton': 'pause',
      }
      doJSONRequest('PUT', "/tracks/player", null, currentData, null);
    }
  });

  // Event listeners for the previous/next buttons
  nextButton.addEventListener("click", function() {
    if (!currentPlayingTrack) return;
    for (var i = 0; i < currentTracks.length; i++) {
      if (currentPlayingTrack._id == currentTracks[i]._id) {
        var currentIdx = i
      }
    }
    if (currentIdx == -1) {
      return console.log("invalid currentTrack");
    }

    var nextIdx = (++currentIdx < currentTracks.length) ? currentIdx : 0
    playTrackById(currentTracks[nextIdx]._id);
  });

  previousButton.addEventListener("click", function() {
    if (!currentPlayingTrack) return;
    for (var i = 0; i < currentTracks.length; i++) {
      if (currentPlayingTrack._id == currentTracks[i]._id) {
        var currentIdx = i
      }
    }

    if (currentIdx == -1) {
      return console.log("invalid currentTrack");
    }

    var prevIdx = (--currentIdx >= 0) ? currentIdx : (currentTracks.length - 1)
    playTrackById(currentTracks[prevIdx]._id);
  });

  // Event listener for the seek bar
  seekRail.addEventListener("click", function(evt) {
    var frac = (evt.offsetX / seekRail.offsetWidth)
    seekBar.style.width = (frac * 100) + "%";

    // Calculate the new time
    var time = audio.duration * frac;
    audio.currentTime = time;
    currentData = {
      'currentTime': time,
    }
    doJSONRequest('PUT', "/tracks/player", null, currentData, null);
  });

  // Update the seek bar as the track plays
  audio.addEventListener("timeupdate", function() {
    // Calculate the slider value
    var value = (100 / audio.duration) * audio.currentTime;

    // Update the seek bar
    seekBar.style.width = value + "%";

    // Update the elapsed time
    timeElapsed.innerHTML = formatTime(Math.floor(audio.currentTime));
  });

  // Event listener for the volume bar
  volumeRail.addEventListener("click", function(evt) {
    var frac = (evt.offsetX / volumeRail.offsetWidth)
    volumeBar.style.width = (frac * 100) + "%";

    audio.volume = frac;
  });

  //Click listener for volume buttons
  volumeOff.addEventListener("click", function(evt) {
    volumeBar.style.width = "0%";
    audio.volume = 0;

    volumeOff.classList.add("active");
    volumeUp.classList.remove("active");
  });

  volumeUp.addEventListener("click", function(evt) {
    volumeBar.style.width = "100%";
    audio.volume = 1;

    volumeUp.classList.add("active");
    volumeOff.classList.remove("active");
  });
}

function play() {
  // Play the track
  audio.play();

  // Update the button icon to 'Pause'
  var playButton = document.getElementById("play-pause");
  playButton.classList.remove('fa-play');
  playButton.classList.add('fa-pause');
}

function pause() {
  // Pause the track
  audio.pause();

  // Update the button icon to 'Play'
  var playButton = document.getElementById("play-pause");
  playButton.classList.remove('fa-pause');
  playButton.classList.add('fa-play');
}

function playTrackById(trackId) {
  checkFirstTime = true;
  incrementCounter("count_start", trackId);
  var track = findOne(currentTracks, "_id", trackId);
  if (!track) return console.log("playTrackById(): Track not found!")

  // console.log(currentTracks)
  currentPlayingTrack = track;

  var artist = findOne(currentArtists, "_id", track.artist._id);
  var album = findOne(currentAlbums, "_id", track.album._id);

  var plTrackArtist = document.querySelector('.pl-track-artist');
  plTrackArtist.href = 'artists/' + artist.name;
  plTrackArtist.innerHTML = artist.name

  var plTrackTitle = document.querySelector('.pl-track-title');
  plTrackTitle.href = 'albums/' + album.name;
  plTrackTitle.innerHTML = currentPlayingTrack.name;

  var moImage = document.querySelector('.pl-artwork .mo-image');
  moImage.style.backgroundImage = "url(" + album.artwork + ")"

  audio.src = track.file;
  // check if half of the song is played to call incrementCounter
  audio.ontimeupdate = function() {
    // console.log(audio.duration/2 + " : " + audio.currentTime)
    if (audio.currentTime > audio.duration / 2 && checkFirstTime) {
      checkFirstTime = false;
      incrementCounter("count_middle", trackId);
    }
  };
  audio.onended = function() {
    incrementCounter("count_end", trackId);
    playNext();
    console.log(trackId)
  };
  play();
}

function playNext() {
  if (!currentPlayingTrack) return;
  for (var i = 0; i < currentTracks.length; i++) {
    if (currentPlayingTrack._id == currentTracks[i]._id) {
      var currentIdx = i
    }
  }
  if (currentIdx == -1) {
    return console.log("invalid currentTrack");
  }

  var nextIdx = (++currentIdx < currentTracks.length) ? currentIdx : 0
  playTrackById(currentTracks[nextIdx]._id);
}
//<!-- /build -->
