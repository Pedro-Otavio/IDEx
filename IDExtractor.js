var IDExtractor = IDExtractor || (function () {
    let notMobile = true;
    let filename = "Playlist";
    let idFrom = d_idFrom;
    let titleFrom = d_titleFrom;
    let array = [];

    this.run = function run() {
        document.querySelector("ytd-playlist-sidebar-renderer").appendChild(document.createElement('H1'));
        notMobile = (window.location.host != "m.youtube.com");
        if (notMobile) {
            array = window.ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
            let info = window.ytInitialData.sidebar.playlistSidebarRenderer.items;
            filename = info[1].playlistSidebarSecondaryInfoRenderer.videoOwner.videoOwnerRenderer.title.runs[0].text + " - " + info[0].playlistSidebarPrimaryInfoRenderer.title.runs[0].text;
            start();
        } else {
            let container = document.querySelector('.etb .mz');
            array = Array.from(container.querySelectorAll('.igb'));
            filename = document.querySelector('.dab > .vjb > span').innerText;
            idFrom = m_idFrom;
            titleFrom = m_titleFrom;
            start();
        }
    }

    function start() {
        let vidDataArr = [];
        let vidData = {
            id: '',
            title: ''
        };
        for (let i = 0, len = array.length; i < len; i++) {
            vidData.id = idFrom(array[i]);
            vidData.title = titleFrom(array[i]);
            vidDataArr.push(vidData);
            vidData = {};
        }
        let PLData = {
            playlist: vidDataArr,
            indexArray: [],
            index: 0,
            time: 0
        };
        let data = JSON.stringify(PLData);
        let blob = new Blob([data], {
            type: "application/json"
        });
        filename += " (" + array.length + ").json";
        download(blob);
    }

    function d_idFrom(e) {
        return e.playlistVideoRenderer.videoId;
    }

    function d_titleFrom(e) {
        let title = e.playlistVideoRenderer.title.simpleText || "<Missing title>";
        return title.search("-") != -1 ? title : e.playlistVideoRenderer.shortBylineText ? "<Missing \"By []\" text>" : e.playlistVideoRenderer.shortBylineText.runs[0].text || "<Missing \"By []\" text>" + " - " + title;
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
        document.querySelector("ytd-playlist-sidebar-renderer>h1:last-of-type>a").remove();
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('A');
        a.text = "Download";
        a.style = "color: #FFFFFF; background-color: #000000;";
        a.download = filename;
        a.href = url;
        document.querySelector("ytd-playlist-sidebar-renderer>h1:last-of-type").appendChild(a);
        a.click();
    }

    return this;
}).call({});
IDExtractor.run();
