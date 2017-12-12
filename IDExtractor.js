let notMobile = (window.location.host != "m.youtube.com");

if (notMobile) {
    let array = window.ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
    start(array, idFrom, titleFrom);
} else {
    let array = Array.from(document.querySelectorAll('.tgb'));
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
    let playerData = {
        index: 0,
        indexArray: [],
        playlist: dataArr
    };
    let data = JSON.stringify(playerData);
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
    return url.substring((i + 2), (i + 13));
}

function m_titleFrom(e) {
    return e.querySelector('.jo > .lkb > span').innerText;
}

function download(blob) {
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('A');
    a.text = "Download";
    a.style = "color: #FFFFFF; background-color: #000000;";
    a.download = "Playlist.json";
    a.href = url;
    a.click();
    window.setTimeout(function () {
        window.URL.revokeObjectURL(url);
    }, 500);
}