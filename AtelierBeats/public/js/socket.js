var socket = io.connect()

socket.on('change-track', function(data) {
	if(window.location.hash.indexOf('library') != -1 || window.location.hash == '')
		drawLibrary(null, false);
})

socket.on('change-album', function(data) {
	if(window.location.hash.indexOf('albums') != -1 || window.location.hash == '')
		drawAlbums(null, false);
})

socket.on('change-artist', function(data) {
	if(window.location.hash.indexOf('artists') != -1 || window.location.hash == '')
		drawArtists(null, false);
})