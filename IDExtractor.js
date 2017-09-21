let blob;

if (window.location.host != "m.youtube.com") {
    let array = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
    start(array, validate, idFrom);
} else {
    let array = document.querySelectorAll('._mgb');
    array.splice(0, 2);
    start(array, m_validate, m_idFrom);
}

function start(array, validate, idFrom) {
    let IDs = idFrom(array[0]);
    for (let i = 1, len = array.length; i < len; i++) {
        if (validate(array[i])) {
            IDs += '~' + idFrom(array[i]);
        }
    }
    blob = new Blob([IDs], {
        type: "text/plain"
    });
    download(blob);
}

function validate(el) {
    return el.playlistVideoRenderer.isPlayable;
}

function idFrom(el) {
    return el.playlistVideoRenderer.videoId;
}

function m_validate(el) {
    return (el.querySelector('img').src != "//s.ytimg.com/yts/img/no_thumbnail-vfl4t3-4R.jpg");
}

function m_idFrom(el) {
    let url = el.querySelector('a').href;
    let i = url.search('v=');
    return url.substring((i + 2), url.length);
}

function download(blob) {
    let url = window.URL.createObjectURL(blob);
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