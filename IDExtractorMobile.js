let blob;

start();

function start() {
    let mgbs = document.querySelectorAll('._mgb');
    let IDs = idFromUrl(mgbs[2].querySelector('a').href);
    for (let i = 3, len = mgbs.length; i < len; i++) {
        IDs += '~' + idFromUrl(mgbs[i].querySelector('a').href);
    }
    blob = new Blob([IDs], {
        type: "text/plain"
    });
    let url = window.URL.createObjectURL(blob);
    downloadbtn(url);
}

function idFromUrl(url) {
    let i = url.search('v=');
    return url.substring(i + 2, url.length);
}

function downloadbtn(url) {
    let div = document.createElement('DIV');
    div.innerHTML = '<a id="btnDownload" href="' + url + '" download="IDs.txt" onclick="free("' + url + '")"><h1 style="color: #FFFFFF; background-color: #000000;">Download</h1></a>';
    let content = document.getElementById('content')
    content.insertBefore(div, content.childNodes[0]);
    document.getElementById('btnDownload').click();
}

function free(url) {
    window.setTimeout(function () {
        window.URL.revokeObjectURL(url);
    }, 500);
}
