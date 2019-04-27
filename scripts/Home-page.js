function clearAllCookies() {
    var cookies = document.cookie;
    var singleCookies = cookies.split('; ');
    for (let i = 0; i < singleCookies.length; i++) {
        cookieName = singleCookies[i].split('=')[0];
        Cookies.clear(cookieName);
    }
}

function makeCookie(name, value) {
    const expDate = new Date(2099, 11,31); //january = 0, december = 11

    //if cookie already exist: delete it first.
    var cookie = Cookies.get(name);
    if (typeof cookie !== 'undefined' || cookie !== null || cookie !== '') {
        Cookies.clear(name);
    }

    Cookies.set(name, value, {expiry: expDate});
}

function onload() {
//    clearAllCookies();
    clock();
    makeLinks();
    updateWeather();
}



window.addEventListener('load', function() {
    onload();
});
