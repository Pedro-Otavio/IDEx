var notMobile = true;
var filename = "Playlist";
var idFrom = d_idFrom;
var titleFrom = d_titleFrom;
var array = [];

function setup() {
    notMobile = (window.location.host != "m.youtube.com");
    if (notMobile) {
        array = window.ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
        filename = ytInitialData.sidebar.playlistSidebarRenderer.items[0].playlistSidebarPrimaryInfoRenderer.title.runs[0].text;
        start();
    } else {
        let container = document.querySelector('.etb .mz');
        array = Array.from(container.querySelectorAll('.igb'));
        filename = document.querySelector('.dab > .vjb > span').innerText;
        start();
    }
}

function start() {
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
        playlist: dataArr,
        indexArray: [],
        index: 0,
        time: 0
    };
    let data = JSON.stringify(playerData);
    let blob = new Blob([data], {
        type: "application/json"
    });
    filename += " (" + array.length + ")";
    download(blob);
}

function d_idFrom(e) {
    return e.playlistVideoRenderer.videoId;
}

function d_titleFrom(e) {
    return e.playlistVideoRenderer.title.simpleText;
}

function m_idFrom(e) {
    let url = e.querySelector('a').href;
    let start = url.search('v=');
    let r = url.substring(start + 2);
    let end = r.search('&|/');
    if (end !== -1) {
        return r.substring(0, end);
    } else {
        return r;
    }
}

function m_titleFrom(e) {
    return e.querySelector('.xn > .vjb > span').innerText;
}

function download(blob) {
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('A');
    a.text = "Download";
    a.style = "color: #FFFFFF; background-color: #000000;";
    a.download = filename;
    a.href = url;
    a.click();
    window.setTimeout(function () {
        window.URL.revokeObjectURL(url);
    }, 500);
}
