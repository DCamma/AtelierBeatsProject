function formatTime(totalSec){
	var hours = parseInt( totalSec / 3600 ) % 24;
	var minutes = parseInt( totalSec / 60 ) % 60;
	var seconds = totalSec % 60;

	var result = (hours < 1 ? '': hours + ':') ;
	result +=  (minutes < 1 ? "00:" : minutes + ':') ;
	result += (seconds  < 10 ? "0" + seconds : seconds);
	return result;
}


function formatTimestamp(d){
	if(d instanceof Date){
		return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ", " + d.getDate() + "/" + (d.getMonth() + 1)  + "/" + d.getFullYear();
	} else throw new Error("d is not a date");
}

function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
	if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

/**
 * Returns a random number between min (inclusive) and max (inclusive).
 *
 * Source: http://stackoverflow.com/a/1527820/3924118
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}