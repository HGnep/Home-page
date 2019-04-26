function clock() {
    //analog or digital?
    const cookieValue = getOrSetClockCookie();
    //check radiobutton
    const radioBtn = document.getElementById(cookieValue);
    radioBtn.checked = true;
    //draw clock and update it
    setClock(cookieValue);
    updateClockDigital();
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

function setClock(digitalOrAnalog) {

    const analog = document.getElementById('clock--analog');
    const digital = document.getElementById('clock--digital');

    if (digitalOrAnalog === 'digital') {
        analog.style.display = "none";
        digital.style.display = "block";
    }
    else if (digitalOrAnalog === 'analog') {
        analog.style.display = "block";
        digital.style.display = "none";
    }
    else {
        console.log('invalid value for digitalOrAnalog: ', digitalOrAnalog);
    }
}

function getOrSetClockCookie() {
    var cookie = Cookies.get('clock');
    if (typeof cookie === 'undefined' || cookie === null || cookie === '') {
        makeCookie('clock', 'digital');
        return 'digital';
    }
    else {
        return cookie;
    }
}

function clockChanged() {
    let value = "";
    var radios = document.getElementsByName('anOrDig');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            value = radios[i].value;
        }
    }
    makeCookie('clock', value);
    setClock(value);
}
