let timerStart = true;
let intervalId;
const start = Date.now();

let displayTime = function () {
  let millis = Date.now() - start;

  let hours = Math.floor(millis / 3600000);
  let hoursHtml = '00';
  if (hours < 10) {
    hoursHtml = '0' + hours;
  }
  else {
    hoursHtml = hours.toString();
  }

  let mins = Math.floor(millis / 60000) % 60;
  let minsHtml = '00';
  if (mins < 10) {
    minsHtml = '0' + mins;
  }
  else {
    minsHtml = mins.toString();
  }

  let seconds = Math.floor(millis / 1000) % 60;
  let secondsHtml = '00';
  if (seconds < 10) {
    secondsHtml = '0' + seconds;
  }
  else {
    secondsHtml = seconds.toString();
  }
  postMessage([hoursHtml, minsHtml, secondsHtml]);
};

onmessage = function () {
  if (timerStart) {
    intervalId = setInterval(displayTime, 1000);
    timerStart = false;
  }
}

