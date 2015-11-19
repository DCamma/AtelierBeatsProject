var socket = io.connect()

socket.on('change-track', function(data) {
    if (window.location.hash.indexOf('library') != -1 || window.location.hash == '')
        drawLibrary(null, false, true);
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
