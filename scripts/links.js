function link(url, logo, name) {
    //template strings is a nice alternative, but isn't supported by all browsers: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    var anchorStart = '<a href="' + url + '">';
    var anchorEnd = '</a>';
    var img = '<img alt="' + name + '" src="' + logo + '">';

    var completeLink = anchorStart + img + anchorEnd;
    return completeLink;
}

function makeLinks() {
    var links = [
        link('https://github.com/HGnep',    'img/GitHub.png',      'GitHub'),
        link('https://mail.google.com/',    'img/Gmail.png',       'Gmail'),
        link('https://www.google.nl/maps/', 'img/Google-Maps.png', 'Google maps'),
        link('https://www.overleaf.com/',   'img/Overleaf.png',    'Overleaf'),
        link('https://open.spotify.com/',   'img/Spotify.png',     'Spotify'),
        link('https://web.whatsapp.com/',   'img/Whatsapp.png',    'Whatsapp'),
        link('https://www.netflix.com/',    'img/Netflix.png',     'Netflix'),
        link('https://nos.nl/',             'img/NOS.jpg',         'NOS')
    ];

    var html = "";
    for (let i = 0; i < links.length; i++)
    {
        html += '<div class=links__item>' + links[i] + '</div>';
    }
    var div = document.getElementById('links');
    div.innerHTML = html;
}
