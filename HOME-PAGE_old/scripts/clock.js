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
    let seconds = now.getSeconds();
    let handLength = 45; //percent
    let angle = (seconds === 0)? 0 : seconds / 60.0 * 2 * Math.PI;
    angle = angle - 0.5 * Math.PI; //angle of zero is at 3 o'clock
    let x_pos = Math.cos(angle) * handLength + 50;
    let y_pos = Math.sin(angle) * handLength + 50;
    let $hand = $('#second-hand');
    $hand.attr('y2', y_pos + "%");
    $hand.attr('x2', x_pos + "%");

    //minutes
    seconds += now.getMinutes() * 60;
    handLength = 45; //percent
    angle = (seconds === 0)? 0 : seconds / 3600.0 * 2 * Math.PI;
    angle = angle - 0.5 * Math.PI; //angle of zero is at 3 o'clock
    x_pos = Math.cos(angle) * handLength + 50;
    y_pos = Math.sin(angle) * handLength + 50;
    $hand = $('#minute-hand');
    $hand.attr('y2', y_pos + "%");
    $hand.attr('x2', x_pos + "%");

    //hours
    seconds += now.getHours() * 3600;
    handLength = 35; //percent
    angle = (seconds === 0)? 0 : seconds / 43200.0 * 2 * Math.PI;
    angle = angle - 0.5 * Math.PI; //angle of zero is at 3 o'clock
    x_pos = Math.cos(angle) * handLength + 50;
    y_pos = Math.sin(angle) * handLength + 50;
    $hand = $('#hour-hand');
    $hand.attr('y2', y_pos + "%");
    $hand.attr('x2', x_pos + "%");

    //minute lines
    for (let i = 1; i <= 60; i++) {
        const fiveMinute = i%5 === 0;
        const svg = document.getElementById('svg-clock');
        const element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const farDistance = 48;
        const closeDistance = fiveMinute ? 40: 46;
        const className = fiveMinute ? "fiveMinute-line" : "minute-line";
        angle = i / 30 * Math.PI;
        x1_pos = Math.cos(angle) * closeDistance + 50;
        y1_pos = Math.sin(angle) * closeDistance + 50;
        x2_pos = Math.cos(angle) * farDistance + 50;
        y2_pos = Math.sin(angle) * farDistance + 50;
        element.setAttribute('x1', x1_pos + "%");
        element.setAttribute('y1', y1_pos + "%");
        element.setAttribute('x2', x2_pos + "%");
        element.setAttribute('y2', y2_pos + "%");
        element.setAttribute('stroke', 'black');
        element.setAttribute('stroke-width', 5);
        element.setAttribute('class', className);
        svg.appendChild(element);
    }
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
