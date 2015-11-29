// views/activities.dust
(function(){dust.register("activities",body_0);function body_0(chk,ctx){return chk.w("<!-- CSS classes are the same as for tracks.dust --><section class=\"flex-tracklist\" id=\"tracks-list\"><div class=\"fl-tl-thead fl-tl-row\"><div class=\"fl-tl-th fl-tl-position\">#</div><div class=\"fl-tl-th fl-tl-name\">Action</div><div class=\"fl-tl-th fl-tl-artist\">Target</div><div class=\"fl-tl-th fl-tl-album\">Timestamp</div></div>").s(ctx.get(["activities"], false),ctx,{"block":body_1},{}).w("</section>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<div id=\"").f(ctx.get(["_id"], false),ctx,"h").w("\" class=\"fl-tl-row activity-row\" draggable=\"true\" ondragstart=\"drag(event)\" data-tid=\"").f(ctx.get(["_id"], false),ctx,"h").w("\"><div class=\"fl-tl-cell fl-tl-position\"><span>").f(ctx.get(["n"], false),ctx,"h").w("</span></div>\t\t\t<div class=\"fl-tl-cell fl-tl-name activity-row\" data-url=\"").f(ctx.get(["url"], false),ctx,"h").w("\"><span class=\"activity-row\" data-url=\"").f(ctx.get(["url"], false),ctx,"h").w("\">").f(ctx.get(["action"], false),ctx,"h").w("</span></div><div class=\"fl-tl-cell fl-tl-artist\"><span>").f(ctx.get(["target"], false),ctx,"h").w("</span></div><div class=\"fl-tl-cell fl-tl-album\"><span>").f(ctx.get(["timestamp"], false),ctx,"h").w("</span></div></div>");}body_1.__dustBody=!0;return body_0;})();
 // views/album.dust
(function(){dust.register("album",body_0);function body_0(chk,ctx){return chk.w("<section class=\"single-album-section\"><ul class=\"grid-list\"><li><div class=\"media-object\"><div class=\"mo-image\" style=\"background-image: url(").f(ctx.getPath(false, ["album","artwork"]),ctx,"h").w(")\"></div><div class=\"mo-overlay\"></div></div><div class=\"mo-info subtitle album\"><a class=\"mo-title\">").f(ctx.getPath(false, ["album","name"]),ctx,"h").w("</a><div class=\"mo-subtitle text-muted one-line\"><a class=\"artist-link\" title=\"").f(ctx.getPath(false, ["album","artist","name"]),ctx,"h").w("\" href=\"artists/").f(ctx.getPath(false, ["album","artist","_id"]),ctx,"h").w("\">").f(ctx.getPath(false, ["album","artist","name"]),ctx,"h").w("</a></div><div class=\"mo-subtitle text-muted one-line\">").f(ctx.getPath(false, ["album","label"]),ctx,"h").w("</div><div class=\"mo-subtitle text-muted one-line\">Released: ").f(ctx.getPath(false, ["album","dateReleased"]),ctx,"h").w("</div></div></li></ul></section>").p("tracks",ctx,{});}body_0.__dustBody=!0;return body_0;})();
 // views/albums.dust
(function(){dust.register("albums",body_0);function body_0(chk,ctx){return chk.w("<section class=\"album-section\"><div class=\"fav-albums\"><!-- <span class=\"fav-albums-text\">Favorites</span> --> <span class=\"like-filter\"><a title=\"Show only favourite albums\" class=\"tooltip\"><span title=\"\" >&#10084;</span></a></span></div><br><ul class=\"grid-list clearfix\" id=\"albums-list\">").s(ctx.get(["albums"], false),ctx,{"block":body_1},{}).w("</ul></section>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<li><span class=\"delete-btn\"><a href=\"albums/").f(ctx.get(["_id"], false),ctx,"h").w("\">&times;</a></span><span class=\"like-btn\" id=\"like\"><a href=\"albums/").f(ctx.get(["_id"], false),ctx,"h").w("\">&#10084;</a></span><div class=\"media-object\"><div class=\"mo-image\" style=\"background-image: url(").f(ctx.get(["artwork"], false),ctx,"h").w(")\"></div><div class=\"mo-overlay\"></div></div><div class=\"mo-info subtitle\"><a class=\"mo-title album-link\" href=\"albums/").f(ctx.get(["_id"], false),ctx,"h").w("\">").f(ctx.get(["name"], false),ctx,"h").w("</a><div class=\"mo-subtitle text-muted one-line\"><a title=\"").f(ctx.getPath(false, ["artist","name"]),ctx,"h").w("\" class=\"artist-link\" href=\"artists/").f(ctx.getPath(false, ["artist","_id"]),ctx,"h").w("\">").f(ctx.getPath(false, ["artist","name"]),ctx,"h").w("</a></div></div></li>");}body_1.__dustBody=!0;return body_0;})();
 // views/artist.dust
(function(){dust.register("artist",body_0);function body_0(chk,ctx){return chk.w("<section class=\"single-artist-section\"><ul class=\"grid-list\"><li><div class=\"media-object\"><div class=\"mo-image\" style=\"background-image: url(").f(ctx.getPath(false, ["artist","artwork"]),ctx,"h").w(")\"></div><div class=\"mo-overlay\"></div></div><div class=\"mo-info subtitle artist\"><a class=\"mo-title\">").f(ctx.getPath(false, ["artist","name"]),ctx,"h").w("</a><div class=\"mo-subtitle text-muted one-line\">").f(ctx.getPath(false, ["artist","genre"]),ctx,"h").w("</div></div></li></ul></section>").p("tracks",ctx,{});}body_0.__dustBody=!0;return body_0;})();
 // views/artists.dust
(function(){dust.register("artists",body_0);function body_0(chk,ctx){return chk.w("<section class=\"artist-section\"><ul class=\"grid-list clearfix\" id=\"artists-list\">").s(ctx.get(["artists"], false),ctx,{"block":body_1},{}).w(" </ul></section>\t");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<li><span class=\"delete-btn\"><a href=\"artists/").f(ctx.get(["_id"], false),ctx,"h").w("\">&times;</a></span><div class=\"media-object\"><div class=\"mo-image\" style=\"background-image: url(").f(ctx.get(["artwork"], false),ctx,"h").w(")\"></div><div class=\"mo-overlay\"></div></div><div class=\"mo-info\"><a class=\"artist-link\" href=\"artists/").f(ctx.get(["_id"], false),ctx,"h").w("\">").f(ctx.get(["name"], false),ctx,"h").w("</a></div></li>");}body_1.__dustBody=!0;return body_0;})();
 // views/index.dust
(function(){dust.register("index",body_0);function body_0(chk,ctx){return chk.w("<!DOCTYPE html><html><head><title>").f(ctx.get(["title"], false),ctx,"h").w("</title><link rel='stylesheet' href='/css/style.css' /></head><body><h1 class=\"heading\">").f(ctx.get(["title"], false),ctx,"h").w("</h1><h3>Resources</h3><ul class=\"links\">").s(ctx.get(["links"], false),ctx,{"block":body_1},{}).w("</ul><p>Note that the resources response bodies are in JSON format with <code>Content-Type: application/json</code></p></body></html>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<li class=\"link\"><span class=\"rel\">").f(ctx.get(["rel"], false),ctx,"h").w("</span> <a href=\"").f(ctx.getPath(false, ["link","href"]),ctx,"h").w("\">").f(ctx.get(["href"], false),ctx,"h").w("</a></li>");}body_1.__dustBody=!0;return body_0;})();
 // views/library.dust
(function(){dust.register("library",body_0);function body_0(chk,ctx){return chk.w("<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"initial-scale=1.0\"><title>Atelier Beats</title><link rel=\"stylesheet\" href=\"css/standardize.css\"><link rel=\"stylesheet\" href=\"css/base.css\"><link rel=\"stylesheet\" href=\"css/glyphicons.css\"><link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css\" rel=\"stylesheet\"></head><body class=\"body library\" data-user-id=\"").f(ctx.get(["userid"], false),ctx,"h").w("\"><div class=\"container main-wrapper\"><nav id=\"main-nav\" class=\"main-nav-float\"><label id=\"main-menu-toggle-label\" for=\"main-menu-toggle\"><i class=\"fa fa-bars\"></i></label><input type=\"checkbox\" id=\"main-menu-toggle\"><!--        <h2 class=\"fat logo\">Atelier<span class=\"pulse\" style=\"display:inline-block;\">Beats.</span></h2>--><h2 class=\"fat logo\">AtelierBeats.</h2><div class=\"main-nav-content\"><ul id=\"main-menu\" class=\"nav-menu\"><li class=\"search-item\"><span class=\"nav-menu-icon search-icon glyphicon glyphicon-search\"></span><input id=\"main-search\" placeholder=\"Search\" type=\"search\" class=\"nav-menu-search\"></li><li><a href=\"library.html\"><i class=\"nav-menu-icon glyphicon glyphicon-music\"></i>Library</a></li><li><a href=\"artists.html\"><i class=\"nav-menu-icon fa fa-users\"></i>Artists</a></li><li><a href=\"albums.html\"><i class=\"nav-menu-icon icons8-music-record\"></i>Albums</a></li><!-- Adding a new menu item for ex 9 --><li><a href=\"activities.html\"><i class=\"nav-menu-icon glyphicon glyphicon-stats\"></i>Activities</a></li><li class=\"mm-user-item\"><a href=\"/user\" class=\"userName\"><i class=\"nav-menu-icon fa fa-user\"></i>").f(ctx.get(["username"], false),ctx,"h").w("</a></li><li class=\"mm-user-item\"><a href=\"/signout\"><i class=\"nav-menu-icon fa fa-sign-out\"></i>logout</a></li></ul><a href=\"#\" class=\"create-playlist\" id=\"create-pl-btn\"><i class=\"fa fa-plus-circle new-playlist-circle\"></i><span>New Playlist</span></a><ul class=\"nav-menu\" id=\"playlists\"><!-- Playlists will be rendered here --></ul></div> <!-- /.main-nav-content --></nav><section class=\"main-content main-content-float-menu clearfix\"><nav id=\"user-nav\" class=\"clearfix\"><ul class=\"nav-menu horizontal-menu float-right clearfix\"><li><a href=\"#\" id=\"clientNumber\"></a></li><li><a href=\"/user\" class=\"userName\">").f(ctx.get(["username"], false),ctx,"h").w("</a></li><li><a href=\"/signout\">logout</a></li></ul></nav><section class=\"player\"><div class=\"pl-info-wrapper\"><div class=\"pl-artwork\"><div class=\"media-object\"><div class=\"mo-image\" style=\"background-image: url('./images/albums/thin_lizzy-live_and_dangerous.jpg')\"></div></div></div></div><div class=\"pl-wrapper\"><!--  <audio id=\"leplayer\" onloadedmetadata=><source src=\"https://archive.org/download/testmp3testfile/mpthreetest.mp3\" type=\"audio/mpeg\">Your browser does not support the audio tag.</audio> --><div class=\"pl-controls\"><button id=\"shuffle\" class=\"btn btn-icon fa fa-random\"> </button><button id=\"previous\" class=\"btn btn-icon fa fa-step-backward\"></button><button id=\"play-pause\" class=\"btn btn-icon fa fa-play\"></button><button id=\"next\" class=\"btn btn-icon fa fa-step-forward\"></button></div><div class=\"pl-progress\"><div class=\"pl-track-info\"><a title=\"Thin Lizzy\" class=\"pl-track-artist\" href=\"artists/Thin%20Lizzy\">Thin Lizzy</a>-<a class=\"pl-track-title\" href=\"albums/Thin%20Lizzy%20-%20Live%20And%20Dangerous\">Don't Believe A Word</a></div><div class=\"pl-progress-container\"><div class=\"time time-elapsed\" id=\"time-elapsed\">0:00</div><div class=\"pl-timeline-wrapper\"><div class=\"pl-timeline-rail\" id=\"pl-timeline-rail\"><div class=\"pl-timeline-bar\" id=\"pl-timeline-bar\"></div></div></div><div class=\"time time-total\" id=\"time-total\">2:19</div></div></div><div class=\"pl-volume\" id=\"pl-volume\"><i class=\"btn-icon fa fa-volume-off\" id=\"volume-off\"></i><div class=\"pl-volume-wrapper\"><div class=\"pl-volume-rail\" id=\"pl-volume-rail\"><div class=\"pl-volume-bar\" id=\"pl-volume-bar\"></div></div></div><i class=\"btn-icon fa fa-volume-up\" id=\"volume-up\"></i></div></div></section> <!-- /.player --><section id=\"content\"><!-- Content will be rendered here --></section></section> <!-- /.main-content --></div><script src=\"/socket.io/socket.io.js\"></script><script src=\"js/dust-core.min.js\"></script><!-- // <script src=\"js/library.js\"></script> --><script src=\"http://rubaxa.github.io/Sortable/Sortable.js\"></script><script src=\"js/model.js\"></script><script src=\"js/utils.js\"></script><script src=\"views/views.js\"></script><script src=\"js/ajax.js\"></script><script src=\"js/app.js\"></script><script src=\"js/socket.js\"></script></body></html>");}body_0.__dustBody=!0;return body_0;})();
 // views/login.dust
(function(){dust.register("login",body_0);function body_0(chk,ctx){return chk.w("<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"initial-scale=1.0\"><title>Login</title><link rel=\"stylesheet\" href=\"css/standardize.css\"><link rel=\"stylesheet\" href=\"css/base.css\"><link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css\" rel=\"stylesheet\"></head><body class=\"body login\"><div class=\"vertical-align-wrapper\"><div class=\"vertical-align-box\"><h1 class=\"slogan\">Gotta <i class=\"fa fa-heart beats pulse\" style=\"color:#B13A3D;\"></i> that sound.</h1><div class=\"form-login-wrapper\"><form action=\"/login\" method=\"POST\" class=\"form-login\"><input class=\"form-control form-stacked\" name=\"username\" placeholder=\"Username\" type=\"text\" required autofocus><input class=\"form-control form-stacked last\" name=\"password\" placeholder=\"Password\" type=\"password\" required>").x(ctx.get(["message"], false),ctx,{"block":body_1},{}).w("<input class=\"btn btn-beats btn-block btn-stacked\" value=\"Tune in\" type=\"submit\"></form><p>Don't have an account? <a href=\"/signup\" class=\"beats\"><strong>sign up</strong></a> now!</p></div> </div></div><h1 class=\"fat blue-glow bottom-right\">Atelier<span class=\"pulse\" style=\"display:inline-block;\">Beats.</span></h1></body></html>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<p class=\"user-not-found\">").f(ctx.get(["message"], false),ctx,"h").w("</p>");}body_1.__dustBody=!0;return body_0;})();
 // views/playlist.dust
(function(){dust.register("playlist",body_0);function body_0(chk,ctx){return chk.w("<section id=\"playlistHeader\"><!-- Exercise 1.d --><div class=\"canvas-container\"><canvas width='200' height='200' style=\"border: 1px dashed gray; background-color:transparent;\" id=\"playlistArtworkCanvas\"></canvas>   </div><div class=\"playlist-info\"><div class=\"playlist-info-name\">").f(ctx.getPath(false, ["playlist","name"]),ctx,"h").w("</div><div class=\"playlist-info-track-num\">").f(ctx.getPath(false, ["playlist","trackMsg"]),ctx,"h").w("</div></div> <hr/></section><section class=\"flex-tracklist\" id=\"tracks-list\"><div class=\"fl-tl-thead fl-tl-row\" id=\"ignore\"><div class=\"fl-tl-th fl-tl-name\">Song</div><div class=\"fl-tl-th fl-tl-artist\">Artist</div><div class=\"fl-tl-th fl-tl-album\">Album</div><div class=\"fl-tl-th fl-tl-counter\">c.Sta</div><div class=\"fl-tl-th fl-tl-counter\">c.Mid</div><div class=\"fl-tl-th fl-tl-counter\">c.End</div><div class=\"fl-tl-th fl-tl-time\">Time</div><div class=\"fl-tl-th fl-tl-delete\"></div></div>").s(ctx.get(["tracks"], false),ctx,{"block":body_1},{}).w("</section>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<div id=\"").f(ctx.get(["_id"], false),ctx,"h").w("\" class=\"fl-tl-row\" draggable=\"true\" ondragstart=\"drag(event)\"><div class=\"fl-tl-cell fl-tl-name\"><span class=\"fl-tl-file-link\" data-tid=\"").f(ctx.get(["_id"], false),ctx,"h").w("\" href=\"tracks/").f(ctx.get(["_id"], false),ctx,"h").w("\">").f(ctx.get(["name"], false),ctx,"h").w("</span><a class=\"edit-btn\" href=\"#\"><i class=\"fa fa-pencil fl-tl-pencil\"></i></a></div><div class=\"fl-tl-cell fl-tl-artist\"><a class=\"artist-link\" href=\"artists/").f(ctx.getPath(false, ["artist","_id"]),ctx,"h").w("\">").f(ctx.getPath(false, ["artist","name"]),ctx,"h").w("</a></div><div class=\"fl-tl-cell fl-tl-album\">").x(ctx.get(["album"], false),ctx,{"block":body_2},{}).w("</div><div class=\"fl-tl-cell fl-tl-counter\">").f(ctx.get(["count_start"], false),ctx,"h").w("</div><div class=\"fl-tl-cell fl-tl-counter\">").f(ctx.get(["count_middle"], false),ctx,"h").w("</div><div class=\"fl-tl-cell fl-tl-counter\">").f(ctx.get(["count_end"], false),ctx,"h").w("</div><div class=\"fl-tl-cell fl-tl-time\">").f(ctx.get(["duration"], false),ctx,"h").w("</div><div class=\"fl-tl-th fl-tl-delete\"><a href=\"tracks/").f(ctx.get(["_id"], false),ctx,"h").w("\">&times;</a></div></div>");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w("<a class=\"album-link\" href=\"albums/").f(ctx.getPath(false, ["album","_id"]),ctx,"h").w("\">").f(ctx.getPath(false, ["album","name"]),ctx,"h").w("</a>");}body_2.__dustBody=!0;return body_0;})();
 // views/playlists.dust
(function(){dust.register("playlists",body_0);function body_0(chk,ctx){return chk.s(ctx.get(["playlists"], false),ctx,{"block":body_1},{});}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<li id=\"").f(ctx.get(["_id"], false),ctx,"h").w("\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\"><a class=\"pl-name\" data-for=").f(ctx.get(["_id"], false),ctx,"h").w(" href=\"").f(ctx.get(["_id"], false),ctx,"h").w("\" id=\"").f(ctx.get(["_id"], false),ctx,"h").w("\"><i class=\"nav-menu-icon fa fa-bars\"></i><span id=\"").f(ctx.get(["_id"], false),ctx,"h").w("\">").f(ctx.get(["name"], false),ctx,"h").w("</span></a><a class=\"edit-btn\" data-for=").f(ctx.get(["_id"], false),ctx,"h").w(" href=\"#\" id=\"").f(ctx.get(["_id"], false),ctx,"h").w("\"><i class=\"fa fa-pencil\"></i></a><input class=\"pl-name-input\" name=").f(ctx.get(["_id"], false),ctx,"h").w(" type=\"text\" value=").f(ctx.get(["name"], false),ctx,"h").w(" id=\"").f(ctx.get(["_id"], false),ctx,"h").w("\"></li>");}body_1.__dustBody=!0;return body_0;})();
 // views/signup.dust
(function(){dust.register("signup",body_0);function body_0(chk,ctx){return chk.w("<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"initial-scale=1.0\"><title>Signup</title><link rel=\"stylesheet\" href=\"css/standardize.css\"><link rel=\"stylesheet\" href=\"css/base.css\"></head><body class=\"body signup\"><div class=\"vertical-align-wrapper\"><div class=\"vertical-align-box\"><h1 class=\"slogan\">Now listen.</h1><div class=\"form-signup-wrapper\"><form action=\"/signup\" method=\"POST\" class=\"form-signup\"><input class=\"form-control form-stacked\" name=\"firstname\" placeholder=\"Firstname\" type=\"text\"><input class=\"form-control form-stacked\" name=\"lastname\" placeholder=\"Lastname\" type=\"text\"><input class=\"form-control form-stacked\" name=\"username\" placeholder=\"Username\" type=\"text\"><input class=\"form-control form-stacked\" name=\"email\" placeholder=\"email\" type=\"email\"><input class=\"form-control form-stacked\" name=\"password\" placeholder=\"Password\" type=\"password\"><input class=\"form-control form-stacked last\" name=\"repeatPassword\" placeholder=\"Repeat password\" type=\"password\">").x(ctx.get(["message"], false),ctx,{"block":body_1},{}).w("<input class=\"btn btn-beats btn-block btn-stacked\" value=\"Sign up\" type=\"submit\"></form><p>Already have an account? <a href=\"/\" class=\"beats\"><strong>login</strong></a> now!</p></div> </div></div><h1 class=\"fat blue-glow bottom-right\">Atelier<span class=\"pulse\" style=\"display:inline-block;\">Beats.</span></h1></body></html>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<p class=\"user-not-found\">").f(ctx.get(["message"], false),ctx,"h").w("</p>");}body_1.__dustBody=!0;return body_0;})();
 // views/tracks.dust
(function(){dust.register("tracks",body_0);function body_0(chk,ctx){return chk.w("<section class=\"flex-tracklist\" id=\"tracks-list\"><div class=\"fl-tl-thead fl-tl-row\"><div class=\"fl-tl-th fl-tl-name\">Song</div><div class=\"fl-tl-th fl-tl-artist\">Artist</div><div class=\"fl-tl-th fl-tl-album\">Album</div><div class=\"fl-tl-th fl-tl-counter\">c.Sta</div><div class=\"fl-tl-th fl-tl-counter\">c.Mid</div><div class=\"fl-tl-th fl-tl-counter\">c.End</div><div class=\"fl-tl-th fl-tl-time\">Time</div><div class=\"fl-tl-th fl-tl-delete\"></div></div>").s(ctx.get(["tracks"], false),ctx,{"block":body_1},{}).w("</section>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<div id=\"").f(ctx.get(["_id"], false),ctx,"h").w("\" class=\"fl-tl-row\" draggable=\"true\" ondragstart=\"drag(event)\"><div class=\"fl-tl-cell fl-tl-name\"><span class=\"fl-tl-file-link track-name-editable\" data-tid=\"").f(ctx.get(["_id"], false),ctx,"h").w("\" href=\"tracks/").f(ctx.get(["_id"], false),ctx,"h").w("\">").f(ctx.get(["name"], false),ctx,"h").w("</span><a class=\"edit-btn\" href=\"#\"><i class=\"fa fa-pencil fl-tl-pencil\"></i></a></div><div class=\"fl-tl-cell fl-tl-artist\"><a class=\"artist-link\" href=\"artists/").f(ctx.getPath(false, ["artist","_id"]),ctx,"h").w("\">").f(ctx.getPath(false, ["artist","name"]),ctx,"h").w("</a></div><div class=\"fl-tl-cell fl-tl-album\">").x(ctx.get(["album"], false),ctx,{"block":body_2},{}).w("</div><div class=\"fl-tl-cell fl-tl-counter\">").f(ctx.get(["count_start"], false),ctx,"h").w("</div><div class=\"fl-tl-cell fl-tl-counter\">").f(ctx.get(["count_middle"], false),ctx,"h").w("</div><div class=\"fl-tl-cell fl-tl-counter\">").f(ctx.get(["count_end"], false),ctx,"h").w("</div><div class=\"fl-tl-cell fl-tl-time\">").f(ctx.get(["duration"], false),ctx,"h").w("</div><div class=\"fl-tl-th fl-tl-delete\"><a href=\"tracks/").f(ctx.get(["_id"], false),ctx,"h").w("\">&times;</a></div></div>");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w("<a class=\"album-link\" href=\"albums/").f(ctx.getPath(false, ["album","_id"]),ctx,"h").w("\">").f(ctx.getPath(false, ["album","name"]),ctx,"h").w("</a>");}body_2.__dustBody=!0;return body_0;})();
 // views/user.dust
(function(){dust.register("user",body_0);function body_0(chk,ctx){return chk.w("<section id=\"playlistHeader\"><div class=\"canvas-container\"><canvas width='200' height='200' style=\"border: 1px dashed gray; background-color:transparent;\" id=\"playlistArtworkCanvas\"></canvas>   </div><div class=\"playlist-info\"><div class=\"fl-tl-thead user-name-surname\"><div class=\"fl-tl-cell fl-tl-name\">").f(ctx.get(["name"], false),ctx,"h").w(" ").f(ctx.get(["surname"], false),ctx,"h").w("</div> </div><div class=\"fl-tl-thead fl-tl-row\"><div class=\"fl-tl-cell-info fl-tl-name\">Username</div><div class=\"fl-tl-cell fl-tl-name\">").f(ctx.get(["username"], false),ctx,"h").w("</div> </div><div class=\"fl-tl-thead fl-tl-row\"><div class=\"fl-tl-cell-info fl-tl-name\">Email</div><div class=\"fl-tl-cell fl-tl-name\">").f(ctx.get(["email"], false),ctx,"h").w("</div> </div></div> </section>");}body_0.__dustBody=!0;return body_0;})();