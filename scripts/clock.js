function clock() {
    //analog or digital?
    const cookieValue = getClockCookie();

    //check radiobutton
    const radioBtn = document.getElementById(cookieValue);
    radioBtn.checked = true;

    //draw clock and update it
    setClock(cookieValue);
    updateClockDigital();
    setInterval(function(){ updateClockDigital(); }, 500);
    updateClockAnalog();
    setInterval(function(){ updateClockAnalog(); }, 500);
}

function updateClockDigital() {
    const now = new Date();
    const elt = document.getElementById('clock--digital')

    //get current time as string
    let AMorPM = "AM"
    let hours = now.getHours();
    if (hours < 10) {
        hours =  "0" + hours;
    }
    if (hours > 11) {
        hours = hours - 12;
        AMorPM = "PM"
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let seconds = now.getSeconds();
    if (seconds < 10) {
        seconds =  "0" + seconds;
    }
    const timeString = hours + ":" + minutes + ":" + seconds;// + " " + AMorPM;

    //set clock value
    elt.innerHTML = timeString;
}

function updateClockAnalog() {
    const now = new Date();
    //seconds
    const seconds = now.getSeconds();
    let handLength = 48; //percent
    let angle = (seconds === 0)? 0 : seconds / 60.0 * 2 * Math.PI;
    angle = angle - 0.5 * Math.PI; //angle of zero is at 3 o'clock
    let x_pos = Math.cos(angle) * handLength + 50;
    let y_pos = Math.sin(angle) * handLength + 50;
    let $hand = $('#second-hand');
    $hand.attr('y2', y_pos + "%");
    $hand.attr('x2', x_pos + "%");
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

function getClockCookie() {
    let cookie = Cookies.get('clock');
    if (typeof cookie === 'undefined' || cookie === null || cookie === '') {
        makeCookie('clock', 'analog');
        cookie = 'analog';
    }
    return cookie;
}

function clockChanged() {
    let value = "";
    const radios = document.getElementsByName('anOrDig');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            value = radios[i].value;
        }
    }
    makeCookie('clock', value);
    setClock(value);
}
