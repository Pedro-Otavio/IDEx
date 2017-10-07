let base = false;
let dict = false;
let fileReaderBase = new FileReader();
let fileReaderDict = new FileReader();
let fileBase, fileDict;

$('#fileInputBase').change(function () { base = true; enable(); });
$('#fileInputDictionary').change(function () { dict = true; enable(); });
$('#merge').click(merge);

function enable() {
    if (base && dict) {
        $('#merge').prop('disabled', false);
        base = false;
        dict = false;
    }
}

fileReaderBase.onerror = function (event) {
    console.error("\nFileReader error code " + event.target.error.code + "\n");
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
    if (base && dict) {
        let dictIds = [];
        for (let i = 0, len = fileDict.length; i < len; ++i) {
            dictIds[i] = fileDict[i].id;
        }
        let renamedIds = [];
        let vidData = {
            id: '',
            title: ''
        };
        for (let i = 0, len = fileBase.length; i < len; ++i) {
            vidData.id = fileBase[i].id;
            let dictIndex = dictIds.indexOf(vidData.id);
            vidData.title = (dictIndex != -1) ? fileDict[dictIndex].title : fileBase[i].title;
            renamedIds.push(vidData);
            vidData = {};
        }
        let data = JSON.stringify(renamedIds);
        let blob = new Blob([data], {
            type: 'application/json'
        });
        let url = window.URL.createObjectURL(blob);
        $('#hiddenLink').attr('href', url).attr('download', 'RenamedIDs.json');
        document.querySelector('#hiddenLink').click(); //jQuery bug
    }
}