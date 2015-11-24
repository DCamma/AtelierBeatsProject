var socket = io.connect()

socket.on('change-track', function(data) {
    if (window.location.hash.indexOf('library') != -1 || window.location.hash == '')
        drawLibrary(null, false, true);
    else if(window.location.hash.indexOf('playlist') != -1 || window.location.hash == '')
        setupPlaylists()
})

socket.on('change-album', function(data) {
    if (window.location.hash.indexOf('albums') != -1 || window.location.hash == '') {
        var fav = document.querySelectorAll(".like-filter")[0]; 
        if (fav.style.backgroundColor == "rgb(164, 75, 77)") {
            drawAlbums(null, false, true, "rgb(164, 75, 77)");
        } else {
            drawAlbums(null, false)
        }

    }
})

socket.on('change-artist', function(data) {
    if (window.location.hash.indexOf('artists') != -1 || window.location.hash == '')
        drawArtists(null, false);
})

// added to sync players
socket.on('change-player', function(data) {
    updatePlayer(data);	
})

// <i class="nav-menu-icon fa fa-user"></i>
var textHTML = 'Connected clients : ';

socket.on('clientConnected', function(clientNumber) {
	document.getElementById('clientNumber').innerHTML = textHTML + clientNumber;
})
socket.on('clientDisconnected', function(clientNumber) {
	document.getElementById('clientNumber').innerHTML = textHTML + clientNumber;
})