var header = document.getElementById("pl-header");
var startbtn = document.createElement("a");

extractbtn();

function extractbtn() {
    startbtn.innerHTML = "<h1 style='color: #FFFFFF; padding-top: 2px;'>Extract IDs</h1>";
    startbtn.style.backgroundColor = "#000000";
    startbtn.setAttribute("class", "yt-uix-button");
    startbtn.setAttribute("onclick", "start();");
    header.replaceChild(startbtn, document.getElementsByClassName("pl-header-content")[0]);
    header.scrollIntoView(false);
}

var blob;
function start() {
    var mess = [...(document.getElementById("pl-load-more-destination").childNodes)];
    var rows = mess.filter(isrow);
    var IDs = rows[0].getAttribute("data-video-id");
    for (var i = 1, len = rows.length; i < len; i++) {
        IDs += '~' + rows[i].getAttribute("data-video-id");
    }
    blob = new Blob([IDs], {type: "text/plain"});
    var url = window.URL.createObjectURL(blob);
    downloadbtn(url);
}

function isrow(node) {
    if (node.tagName === "TR") {
        return true;
    } else {
        return false;
    }
}

function downloadbtn(url) {
    var a = document.createElement("a");
    a.innerHTML = "<h1 style='color: #FFFFFF; padding-top: 2px;'>Download</h1>";
    a.style.backgroundColor = "#000000";
    a.setAttribute("class", "yt-uix-button");
    a.setAttribute("href", url);
    a.setAttribute("download", "IDs.txt");
    a.setAttribute("onclick", "free('" + url + "')");
    header.replaceChild(a, startbtn);
}

function free(url) {
    window.setTimeout(function () {
        window.URL.revokeObjectURL(url);
    }, 500);
}
