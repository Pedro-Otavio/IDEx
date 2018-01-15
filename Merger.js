let base = false;
let dict = false;
let fileReaderBase = new FileReader();
let fileReaderDict = new FileReader();
let fileBase, fileDict;

$('#fileInputBase').change(function () {
    base = true;
    enable();
});

$('#fileInputDictionary').change(function () {
    dict = true;
    enable();
});
$('#merge').click(merge);

function enable() {
    if (base && dict) {
        $('#merge').prop('disabled', false);
        base = false;
        dict = false;
    }
}

fileReaderBase.onerror = function (event) {
    alert("\nFileReader error code " + event.target.error.code + "\n");
};

fileReaderDict.onerror = fileReaderBase.onerror;

fileReaderBase.onload = function (event) {
    fileBase = JSON.parse(event.target.result);
    base = true;
    ready();
};

fileReaderDict.onload = function (event) {
    fileDict = JSON.parse(event.target.result);
    dict = true;
    ready();
};

function merge() {
    fileReaderBase.readAsText($('#fileInputBase').prop('files')[0]);
    fileReaderDict.readAsText($('#fileInputDictionary').prop('files')[0]);
}


function ready() {
    if (!base || !dict)
        return;
    
    let dictIds = [];
    for (let i = 0, len = fileDict.playlist.length; i < len; ++i) {
        dictIds[i] = fileDict.playlist[i].id;
    }

    for (let i = 0, len = fileBase.playlist.length; i < len; ++i) {
        let dictIndex = dictIds.indexOf(fileBase.playlist[i].id);
        fileBase.playlist[i].title = (dictIndex != -1) ? fileDict.playlist[dictIndex].title : fileBase.playlist[i].title;
    }
    let data = JSON.stringify(fileBase);
    let blob = new Blob([data], {
        type: 'application/json'
    });
    
    let url = window.URL.createObjectURL(blob);
    $('#hiddenLink').attr('href', url).attr('download', 'RenamedPlaylist.json');
    document.querySelector('#hiddenLink').click(); //jQuery bug
    window.setTimeout(function () {
        window.URL.revokeObjectURL(url);
    }, 500);

}
