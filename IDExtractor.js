let notMobile = (window.location.host != "m.youtube.com");

if (notMobile) {
    let array = window.ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
    start(array, idFrom, titleFrom);
} else {
    let array = Array.from(document.querySelectorAll('._mgb'));
    array.splice(0, 2);
    start(array, m_idFrom, m_titleFrom);
}

function start(array, idFrom, titleFrom) {
    let dataArr = [];
    let vidData = {
        id: '',
        title: ''
    };
    for (let i = 0, len = array.length; i < len; i++) {
        vidData.id = idFrom(array[i]);
        vidData.title = titleFrom(array[i]);
        dataArr.push(vidData);
        vidData = {};
    }
    let data = JSON.stringify(dataArr);
    let blob = new Blob([data], {
        type: "application/json"
    });
    download(blob);
}

function idFrom(e) {
    return e.playlistVideoRenderer.videoId;
}

function titleFrom(e) {
    return e.playlistVideoRenderer.title.simpleText;
}

function m_idFrom(e) {
    let url = e.querySelector('a').href;
    let i = url.search('v=');
    return url.substring((i + 2), url.length);
}

function m_titleFrom(e) {
    return e.querySelector('._mokc').firstChild.firstChild.innerText;
}

function download(blob) {
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('A');
    a.text = "Download";
    a.style = "color: #FFFFFF; background-color: #000000;";
    a.download = "IDs.json";
    a.href = url;
    a.click();
    window.setTimeout(function () {
        window.URL.revokeObjectURL(url);
    }, 500);
}