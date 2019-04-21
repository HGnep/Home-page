function clock() {
    updateClockDigital();
    makeClock('digital');
    setInterval(function(){ updateClockDigital(); }, 500);
}

function updateClockDigital() {
    var now = new Date();
    const elt = document.getElementById('clock--digital')

    //get current time in nice format value
    var AMorPM = "AM"
    var hours = now.getHours();
    if (hours < 10) {
        hours =  "0" + hours;
    }
    if (hours > 12) {
        hours = hours - 12;
        AMorPM = "PM"
    }
    var minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var seconds = now.getSeconds();
    if (seconds < 10) {
        seconds =  "0" + seconds;
    }
    var timeString = hours + ":" + minutes + ":" + seconds + " " + AMorPM;

    //set clock value
    elt.innerHTML = timeString;
}

function makeClock(digitalOrAnalog) {
    const div = document.getElementById('clock');
    if (div == null) {
        console.log('div is null');
        return;
    }
    if (digitalOrAnalog === 'digital') {
        if (div.classList.contains('clock--analog')) {
            div.classList.remove('clock--analog');
        }
        div.classList.add("clock--digital");
    }
    else if (digitalOrAnalog === 'analog') {
        if (div.classList.contains('clock--digital')) {
            div.classList.remove('clock--digital');
        }
        div.classList.add('clock--analog');
    }
    else {
        console.log('invalid value for digitalOrAnalog');
    }
}
