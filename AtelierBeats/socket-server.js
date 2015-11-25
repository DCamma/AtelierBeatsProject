var socketIo = require('socket.io');

var eventBus = require('./pubsub');

var clientNumber = 0;

module.exports = function(httpServer) {
  var io = socketIo(httpServer)

  // Socket.io server
  io.on('connect', function(socket) {
    // console.log('Connected')
    clientNumber += 1;
    io.emit('clientConnected', clientNumber);

    socket.on('disconnect', function() {
      // console.log('Disconnected')
      clientNumber -= 1;
      io.emit('clientDisconnected', clientNumber)
    });

    socket.on('error', function(err) {
      console.log("Error: " + err)
    });
  })

  eventBus.on('track.deleted', function(event) {
    io.emit('change-track', event)
  })

  eventBus.on('track.updated', function(event) {
    io.emit('change-track', event)
  })

  eventBus.on('album.deleted', function(event) {
    io.emit('change-album', event)
  })

  eventBus.on('album.updated', function(event) {
    io.emit('change-album', event)
  })

  eventBus.on('artist.deleted', function(event) {
    io.emit('change-artist', event)
  })

  eventBus.on('artist.updated', function(event) {
      io.emit('change-artist', event)
    })
    // added to syncronize the player
  eventBus.on('player.updated', function(event) {
    io.emit('change-player', event)
  })
}
