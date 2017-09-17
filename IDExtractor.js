let blob;

start();

function start() {
    let contents = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
    let IDs = content[0].playlistVideoRenderer.videoId;
    for (let i = 1, len = contents.length; i < len; i++) {
        IDs += '~' + contents[i].playlistVideoRenderer.videoId;
    }
    blob = new Blob([IDs], {
        type: "text/plain"
    });
    let url = window.URL.createObjectURL(blob);
    downloadbtn(url);
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