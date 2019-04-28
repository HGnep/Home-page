function updateWeather() {
    const data = getWeatherCookie();
    if (data === 'loading') {
        // try again after one second
        setTimeout(updateWeather, 1000);
        return
    }
    drawWeather(data);
    setTimeout(updateWeather, 60*1000);
    $('#weather').click(arrowClick);
}

function arrowClick() {
    const $weather = $('#weather');
    const $clock = $('#clock');

    $weather.toggleClass('weather--full weather--small');
    $clock.toggleClass('clock--hide clock--show');

    console.log('clicked!');
}

function drawWeather(data) {
    //div elements
    const weather__place = document.getElementById('weather__place');
    const weather__temperature = document.getElementById('weather__temperature');
    const weather__summary = document.getElementById('weather__summary');

    //get weather data
    const weatherInfo = JSON.parse(data).liveweer[0];

    //place information on page
    weather__place.innerHTML = weatherInfo.plaats;
    weather__temperature.innerHTML = weatherInfo.temp + '°C';
    weather__summary.innerHTML = weatherInfo.samenv + ', ' + weatherInfo.image;
    if (weatherInfo.alarm !== '0') {
        weather__summary.innerHTML += weatherInfo.alarmtxt;
    }
}

function getWeatherCookie() {
    const now = new Date();
    let cookie = Cookies.get('weather');

    if (typeof cookie === 'undefined' || cookie === null || cookie === '') {
        makeNewWeatherCookie(now);
        cookie = 'loading'
    }
    else {
        const timestamp = Cookies.get('weatherTimestamp');
        diffTimeInMs = now.valueOf() - timestamp;
        if (diffTimeInMs > 1000*60*5) {
            makeNewWeatherCookie(now);
            if (diffTimeInMs > 1000*60*60*2) {
                //if weatherinfo is older than 2 hours, don't show it.
                cookie = 'loading'
            }
        }
    }
    return cookie;
}

function makeNewWeatherCookie(timestamp) {
    $.get('http://weerlive.nl/api/json-data-10min.php?key=demo&locatie=Amsterdam&callback=?', function(data) {
        makeCookie('weather', JSON.stringify(data));
    });
    makeCookie('weatherTimestamp', timestamp.valueOf());
}
