function makeCookie(name, value) {
    const expDate = new Date(2099, 12,31);

    //if cookie already exist: delete it first.
    var cookie = Cookies.get(name);
    if (typeof cookie !== 'undefined' || cookie !== null || cookie !== '') {
        Cookies.clear(name);
    }

    Cookies.set(name, value, {expiry: expDate});
}

function onload() {
    clock();
    makeLinks();
    makeCookie('test', 'success');
}


window.addEventListener('load', function() {
    onload();
});
