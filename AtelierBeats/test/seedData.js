'use strict';

var mongoose = require('mongoose');
var Playlist = mongoose.model('Playlist');
var ObjectId = mongoose.Types.ObjectId;

var artists = {
  name : 'Artist',
  data : [
    {
      "_id"          : ObjectId(),
      "name"         : "Fine Before You Came",
      "genre"        : "Emo Core",
      "artwork"      : "https://www.debaser.it/files/2015%2F42329.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "Verme",
      "genre"        : "Hard Rock",
      "artwork"      : "http://www.toloselatrack.org/uploads/Verme-ultimo-concerto1-e135.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "Lo Stato Sociale",
      "genre"        : "Indie Rock",
      "artwork"      : "http://d2p5dvc3vrbyrj.cloudfront.net/news/20130808-221722-7ff7baf9e49079683b21c367b15c9a23-680.jpeg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "Fast Animals and Slow Kids",
      "genre"        : "Indie Rock",
      "artwork"      : "http://www.toloselatrack.org/uploads/fask_400.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "I Cani",
      "genre"        : "Synth Pop",
      "artwork"      : "http://www.romadaleggere.it/wp-content/uploads/2014/05/i-cani.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "Dropkick Murphys",
      "genre"        : "Celtic Punk",
      "artwork"      : "https://i.ytimg.com/vi/diSN8l1DyNY/maxresdefault.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "The Prodigy",
      "genre"        : "Electronic",
      "artwork"      : "https://s3.amazonaws.com/progweb.s3.easybooking/1442259640.png",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "Gogol Bordello",
      "genre"        : "Alternative Rock",
      "artwork"      : "http://louderthanwar.com/wp-content/uploads/gogol-bordello-helsinki.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "Neutral Milk Hotel",
      "genre"        : "Indie Rock",
      "artwork"      : "http://static.spin.com/files/131015-neutral-milk-hotel.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "PoP_X",
      "genre"        : "Electro",
      "artwork"      : "http://rumoremag.com/wp-content/uploads/2015/02/pop_x.png",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "Pantera",
      "genre"        : "Heavy Metal",
      "artwork"      : "http://www.romebywild.it/wp-content/uploads/2015/06/phil_anselmo6.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "Sunn O)))",
      "genre"        : "Progressive Metal",
      "artwork"      : "http://foto.infan.ru/img/f/25/0/003.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "Death",
      "genre"        : "Death Metal",
      "artwork"      : "http://loudnow.net/assets/2013/08/DeathLogo1.gif",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    }, 

    {
      "_id"          : ObjectId(),
      "name"         : "Pendulum",
      "genre"        : "Drum and Bass",
      "artwork"      : "http://clubtone.net/_ph/1/806208009.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    }, 

    {
      "_id"          : ObjectId(),
      "name"         : "Major Lazer",
      "genre"        : "Electro",
      "artwork"      : "http://musicweek.mtv.it/wp-content/uploads/2015/09/major-lazer-AGGIUNGERE-CLUB-MTV.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "Verdena",
      "genre"        : "Alternative Rock",
      "artwork"      : "http://www.ondarock.it/images/monografie/verdena_1_1425919745.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "Tankard",
      "genre"        : "Thrash Metal",
      "artwork"      : "http://metalassault.com/Interviews/wp-content/uploads/2012/09/Tankard-Kings_Of_Beer-Frontal.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    },

    {
      "_id"          : ObjectId(),
      "name"         : "IAM",
      "genre"        : "French Rap",
      "artwork"      : "https://upload.wikimedia.org/wikipedia/commons/9/98/IAM_%C3%A0_l%27Olympia_de_Montr%C3%A9al.jpg",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)"
    }

  ]
}

var albums = {
  name : 'Album',
  data : [
    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[0]._id,
      "name"         : "Ormai",
      "artwork"      : "https://f1.bcbits.com/img/a0250802243_10.jpg",
      "dateReleased" : "Jan 22 2012 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "La Tempesta Dischi"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[1]._id,
      "name"         : "Bad Verme",
      "artwork"      : "https://verme666.files.wordpress.com/2011/01/badverme_daunlc3b21.jpg",
      "dateReleased" : "Jan 11 2011 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "Verme"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[2]._id,
      "name"         : "L'Italia Peggiore",
      "artwork"      : "http://www.avisonmagazine.com/wp-content/uploads/2014/06/L-Italia-Peggiore-Lo-Stato-Sociale-2014-Vinile-lp2.jpg",
      "dateReleased" : "Jun 02 2014 00:00:00 GMT+0200 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "Garrincha Dischi"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[3]._id,
      "name"         : "Alaska",
      "artwork"      : "http://www.woodworm-music.com/wp-content/uploads/2014/09/fask_alaska-600x600.jpg",
      "dateReleased" : "Oct 03 2014 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "Woodworm"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[4]._id,
      "name"         : "Il sorprendente album d'esordio de I Cani",
      "artwork"      : "http://www.outsidersmusica.it/wordpress/wp-content/uploads/2011/11/I-CANI.jpg",
      "dateReleased" : "Jun 03 2011 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "42 Records"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[5]._id,
      "name"         : "The Warrior's Code",
      "artwork"      : "http://www.dropkickmurphys.com/wp-content/uploads/2013/02/the-warriors-code-600x600.jpg",
      "dateReleased" : "Jun 15 2005 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "Hellcat Records"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[5]._id,
      "name"         : "Signed and Sealed in Blood",
      "artwork"      : "http://www.dropkickmurphys.com/wp-content/uploads/2013/01/signed-and-sealed-in-blood1-600x600.jpg",
      "dateReleased" : "Jan 08 2013 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "Born and Bread Records"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[6]._id,
      "name"         : "Invaders Must Die",
      "artwork"      : "http://ecx.images-amazon.com/images/I/51KYMTL5JBL.jpg",
      "dateReleased" : "Feb 18 2009 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "Victor"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[7]._id,
      "name"         : "Trans-Continental Hustle",
      "artwork"      : "http://www.stereoboard.com/images/stories/new/600x399x161210_js_gogol-bordello.jpg.pagespeed.ic.bRl4GjwcNO.jpg",
      "dateReleased" : "Apr 27 2010 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "American Recordings"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[7]._id,
      "name"         : "Super Taranta!",
      "artwork"      : "http://ecx.images-amazon.com/images/I/61BNz4CYBNL.jpg",
      "dateReleased" : "Jul 09 2009 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "SideOneDummy Records"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[8]._id,
      "name"         : "In the Aeroplane over the Sea",
      "artwork"      : "http://ecx.images-amazon.com/images/I/61z%2BBBE0lPL.jpg",
      "dateReleased" : "Feb 19 1998 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "Merge Records"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[9]._id,
      "name"         : "Io Centro con i Missili",
      "artwork"      : "https://f1.bcbits.com/img/a0745656880_5.jpg",
      "dateReleased" : "Oct 23 2011 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "PoP_X"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[9]._id,
      "name"         : "Una Vita Stupenda",
      "artwork"      : "https://f1.bcbits.com/img/a3030117895_16.jpg",
      "dateReleased" : "Sep 15 2012 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "PoP_X"
    }, 

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[10]._id,
      "name"         : "Vulgar Display of Power",
      "artwork"      : "http://ecx.images-amazon.com/images/I/61LNFb0OpWL.jpg",
      "dateReleased" : "Feb 25 1992 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "Atlantic Records"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[11]._id,
      "name"         : "Soused",
      "artwork"      : "http://deerwaves.com/wp-content/uploads/2014/09/ed43c3a1.jpg",
      "dateReleased" : "Oct 21 2014 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "4AD"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[12]._id,
      "name"         : "The Sound of Perseverance",
      "artwork"      : "http://www.metal-archives.com/images/6/1/8/618.jpg?1111",
      "dateReleased" : "Sep 15 1998 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "Nuclear Blast"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[13]._id,
      "name"         : "Hold Your Color",
      "artwork"      : "http://image.mp3.zdn.vn/covers/8/b/8b76af425fbd72ceff25e8c953c3ba11_1308236910.jpg",
      "dateReleased" : "Jul 25 2005 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "Breakbeat Kaos"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[14]._id,
      "name"         : "Free the Universe",
      "artwork"      : "http://sentireascoltare.com/wp-content/uploads/2013/04/sentireascoltare_major_lazer-free-universe.jpg",
      "dateReleased" : "Apr 16 2013 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "WM Singapore"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[15]._id,
      "name"         : "Requiem",
      "artwork"      : "http://www.ondarock.it/images/cover/verdena_971.jpg",
      "dateReleased" : "Mar 16 2007 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "Black Out"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[16]._id,
      "name"         : "The Beauty and the Beer",
      "artwork"      : "http://shop.afm-records.de/image/cache/data/AFM/763tv4trikixn62jvps6s9kn03-800x800.jpg",
      "dateReleased" : "May 26 2006 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "AFM Records"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[17]._id,
      "name"         : "L'École du micro d'argent",
      "artwork"      : "https://upload.wikimedia.org/wikipedia/en/2/2c/IAM_ecole_du_micro_dargent.png",
      "dateReleased" : "Mar 18 1997 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "label"        : "EMI, Delabel, Virgin"
    }



 

]
}

var tracks = {
  name : 'Track',
  data : [
    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[0]._id,
      "album"        : albums.data[0]._id,
      "name"         : "Capire Settembre",
      "duration"     : 239,
      "file"         : "tracks_folder/1.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Mon Sep 29 1986 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Emo Core"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[0]._id,
      "album"        : albums.data[0]._id,
      "name"         : "Dublino",
      "duration"     : 235,
      "file"         : "tracks_folder/2.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Mon Apr 11 1988 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Emo Core"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[1]._id,
      "album"        : albums.data[1]._id,
      "name"         : "Tutto va Malone",
      "duration"     : 184,
      "file"         : "tracks_folder/3.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Punk Rock"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[2]._id,
      "album"        : albums.data[2]._id,
      "name"         : "In due è amore in tre è una festa",
      "duration"     : 168,
      "file"         : "tracks_folder/4.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Mon Sep 24 1990 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Indie Rock"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[2]._id,
      "album"        : albums.data[2]._id,
      "name"         : "C'eravamo tanto sbagliati",
      "duration"     : 384,
      "file"         : "tracks_folder/5.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Jul 27 1984 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Indie Rock"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[3]._id,
      "album"        : albums.data[3]._id,
      "name"         : "Calci in faccia",
      "duration"     : 195,
      "file"         : "tracks_folder/6.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Mon Feb 24 1986 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Indie Rock"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[4]._id,
      "album"        : albums.data[4]._id,
      "name"         : "Wes Anderson",
      "duration"     : 232,
      "file"         : "tracks_folder/7.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Mon Feb 24 1986 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Electro Pop"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[5]._id,
      "album"        : albums.data[5]._id,
      "name"         : "I'm shipping up to Boston",
      "duration"     : 166,
      "file"         : "tracks_folder/8.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Tue Oct 07 1986 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Celtic Punk"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[5]._id,
      "album"        : albums.data[6]._id,
      "name"         : "End of the Nigth",
      "duration"     : 317,
      "file"         : "tracks_folder/9.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Tue Jul 05 1988 00:00:00 GMT+0200 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Celtic Punk"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[6]._id,
      "album"        : albums.data[7]._id,
      "name"         : "Invaders Must Die",
      "duration"     : 205,
      "file"         : "tracks_folder/10.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Electronic"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[6]._id,
      "album"        : albums.data[7]._id,
      "name"         : "Warrior's Dance",
      "duration"     : 312,
      "file"         : "tracks_folder/11.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Electronic"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[7]._id,
      "album"        : albums.data[8]._id,
      "name"         : "Trans-Continental Hustle",
      "duration"     : 147,
      "file"         : "tracks_folder/12.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Gipsy Punk"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[7]._id,
      "album"        : albums.data[9]._id,
      "name"         : "American Wedding",
      "duration"     : 217,
      "file"         : "tracks_folder/13.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Gipsy Punk"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[8]._id,
      "album"        : albums.data[10]._id,
      "name"         : "Holland, 1945",
      "duration"     : 192,
      "file"         : "tracks_folder/14.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Folk Rock"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[8]._id,
      "album"        : albums.data[10]._id,
      "name"         : "In the Airplane over the Sea",
      "duration"     : 191,
      "file"         : "tracks_folder/15.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Folk Rock"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[9]._id,
      "album"        : albums.data[11]._id,
      "name"         : "Io Centro con i Missili",
      "duration"     : 191,
      "file"         : "tracks_folder/16.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Electronic"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[9]._id,
      "album"        : albums.data[12]._id,
      "name"         : "Una Vita Stupenda",
      "duration"     : 140,
      "file"         : "tracks_folder/17.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Electronic"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[10]._id,
      "album"        : albums.data[13]._id,
      "name"         : "Walk",
      "duration"     : 315,
      "file"         : "tracks_folder/18.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Heavy Metal"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[10]._id,
      "album"        : albums.data[13]._id,
      "name"         : "Mouth For War",
      "duration"     : 239,
      "file"         : "tracks_folder/19.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Heavy Metal"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[11]._id,
      "album"        : albums.data[14]._id,
      "name"         : "Brando",
      "duration"     : 522,
      "file"         : "tracks_folder/20.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Drone Doom Metal"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[12]._id,
      "album"        : albums.data[15]._id,
      "name"         : "Voice of the Soul",
      "duration"     : 224,
      "file"         : "tracks_folder/21.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Progressive Death Metal"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[12]._id,
      "album"        : albums.data[15]._id,
      "name"         : "Painkiller",
      "duration"     : 363,
      "file"         : "tracks_folder/22.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Heavy Metal"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[13]._id,
      "album"        : albums.data[16]._id,
      "name"         : "Tarantula",
      "duration"     : 355,
      "file"         : "tracks_folder/23.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Drum and Bass"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[13]._id,
      "album"        : albums.data[16]._id,
      "name"         : "Blood Sugar",
      "duration"     : 297,
      "file"         : "tracks_folder/24.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Drum and Bass"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[14]._id,
      "album"        : albums.data[17]._id,
      "name"         : "Get Free",
      "duration"     : 307,
      "file"         : "tracks_folder/25.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Indie Pop"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[14]._id,
      "album"        : albums.data[17]._id,
      "name"         : "Jessica",
      "duration"     : 253,
      "file"         : "tracks_folder/26.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Indie Pop"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[15]._id,
      "album"        : albums.data[18]._id,
      "name"         : "Trovami un Modo Semplice per Uscirne",
      "duration"     : 213,
      "file"         : "tracks_folder/27.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Alternative Rock"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[15]._id,
      "album"        : albums.data[18]._id,
      "name"         : "Angie",
      "duration"     : 222,
      "file"         : "tracks_folder/28.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Alternative Rock"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[16]._id,
      "album"        : albums.data[19]._id,
      "name"         : "Die with a Beer in your Hand",
      "duration"     : 323,
      "file"         : "tracks_folder/29.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Thrash Metal"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[16]._id,
      "album"        : albums.data[19]._id,
      "name"         : "Frankfurt: We Need More Beer",
      "duration"     : 228,
      "file"         : "tracks_folder/30.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Fri Feb 04 2005 00:00:00 GMT+0100 (CET)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Thrash Metal"
    },

    {
      "_id"          : ObjectId(),
      "artist"       : artists.data[17]._id,
      "album"        : albums.data[20]._id,
      "name"         : "Petit Frère",
      "duration"     : 283,
      "file"         : "tracks_folder/petit-frere.mp3",
      "id3Tags"      : "",
      "dateReleased" : "Mar 18 1997 00:00:00 GMT+0100 (CEST)",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "genre" : "Rap"
    },


  ]
}

var users = {
  name : 'User', 
  data : [
    {
      "_id"          : ObjectId(),
      "firstName"    : "Leonardo",
      "lastName"     : "Iandiorio",
      "userName"     : "iandil",
      "email"        : "leonardo.iandiorio@usi.ch",
      "password"     : "ciao",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "picture": "https://scontent.cdninstagram.com/hphotos-xpt1/t51.2885-15/s320x320/e35/12224351_447295285477978_2008958257_n.jpg",
      "playlists"    : [
         new Playlist ({
          "name" : 'Indie',
          "tracks": [tracks.data[0]._id, , tracks.data[2]._id, tracks.data[6]._id, tracks.data[13]._id]
        }),
          new Playlist ({
          "name" : 'Brutal',
          "tracks": [tracks.data[18]._id, tracks.data[19]._id, tracks.data[20]._id, tracks.data[28]._id]
        }),
        //   new Playlist ({
        //   "name" : 'masiar Pubb Playlist',
        //   "tracks": [tracks.data[0]._id, tracks.data[4]._id],
        //   "publicPlaylist" : true,
        // })
      ]
    },

    {
      "_id"          : ObjectId(),
      "firstName"    : "Davide",
      "lastName"     : "Cammarata",
      "userName"     : "cammad",
      "email"        : "davide.cammarata@usi.ch",
      "password"     : "ciao",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "picture": "https://totesmahgotes.files.wordpress.com/2010/05/mushroom-wallpaper-super-mario-bros-5431067-1024-10241.jpg",
      "playlists"    : [
         new Playlist ({
          "name" : 'My favs',
          "tracks": [tracks.data[21]._id, tracks.data[29]._id, tracks.data[12]._id, tracks.data[7]._id]
        }),
          new Playlist ({
          "name" : 'Electro',
          "tracks": [tracks.data[15]._id, tracks.data[16]._id, tracks.data[23]._id, tracks.data[25]._id]
        })
      ]
    },

    { 
      "_id"          : ObjectId(),
      "firstName"    : "Nelson",
      "lastName"     : "Brochado",
      "userName"     : "dossan",
      "email"        : "dossan@usi.ch",
      "password"     : "ciao",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "picture": "https://lh3.googleusercontent.com/BmyLieVnrRYLi483woAXv-bnPBqdmSbId6y6ZgXPrVM=s630-fcrop64=1,000010acffffea7b:Soften=1,60,0",
      "playlists"    : [
         new Playlist ({
          "name" : 'French Rap',
          "tracks": [tracks.data[30]._id]
        })
      ]
    },
    { 
      "_id"          : ObjectId(),
      "firstName"    : "a",
      "lastName"     : "a",
      "userName"     : "a",
      "email"        : "a@usi.ch",
      "password"     : "a",
      "dateCreated"  : "Dec 15 2015 10:42:10 GMT+0200 (CEST)",
      "picture" : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Deutsche_Bahn_AG-Logo.svg/2000px-Deutsche_Bahn_AG-Logo.svg.png",
      "playlists"    : [
         new Playlist ({
          "name" : 'p1',
          "tracks": [tracks.data[2]._id, tracks.data[1]._id, tracks.data[11]._id, tracks.data[17]._id]
        })
      ]
    }
  ]
}

var seedData = [];
seedData.push(artists);
seedData.push(albums);
seedData.push(tracks);
seedData.push(users);

module.exports = seedData;
