function formatTime(totalSec) {
  var hours = parseInt(totalSec / 3600) % 24;
  var minutes = parseInt(totalSec / 60) % 60;
  var seconds = (totalSec % 60);
  var result = (hours < 1 ? '' : hours + ':');
  result += (minutes < 1 ? "00:" : minutes + ':');
  result += (seconds < 10 ? "0" + seconds : seconds);
  return result;
}

function formatTimestamp(d) {
  if (d instanceof Date) {
    return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ", " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  } else throw new Error("d is not a date");
}

function hasClass(ele, cls) {
  return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
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

function removeAllChildren(domElement) {
  while (domElement.firstChild)
    domElement.removeChild(domElement.firstChild);
}

function startsWith(string, prefix, ignore) {
  ignore = ignore == false ? ignore : true;
  if (ignore)
    return string.toLowerCase().slice(0, prefix.length) == prefix.toLowerCase();
  else
    return string.slice(0, prefix.length) == prefix;
}

function isString(s) {
  return typeof(s) === 'string' || s instanceof String;
}

function goodFileName(fileName) {
  return fileName && isString(fileName);
}

/* Source: http://stackoverflow.com/a/1051303/3924118 */
function getFileName(fullName) {
  if (goodFileName(fullName)) {
    return fullName.replace(/^.*[\\\/]/, '')
  } else {
    throw new Error("fullName is not a valid string");
  }
}

/* Replaces spaces with dashes */
function formatTrackName(originalName) {
  return originalName.replace(/\s+/g, '-').toLowerCase();
}

/* Validation of email should be done server-side because JS could be disabled,
but for now I am going to do it client-side for simplicity. 
Source: http://stackoverflow.com/a/46181/3924118
*/
function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}
