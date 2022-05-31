var songName = "";
var artistName = "";
var numOfLines = 0
var audioID = document.getElementById('audioPlayback');
var playButton = $("#playAB");
var rangeBar = document.getElementById("audioPlaybackBar");
var permaPause = true;
var barUpdateClearance = true;
var lyrs = $("#lyricsEnterer");
var lyricsEntered = $("#lyricsEnterer");
var lyrBoardID = document.getElementById("lyrBoard");
var lyrBoardTimeID = document.getElementById("lyrBoardTime")
var globalLineID = 0;
var timeOffset = -0.2;
var timeStamps = new Array();
var recordArray = new Array();
var splitLineA = new Array();
var completed;
var syncKeycutUnicode = 16;
var desyncKeycutUnicode = 8;

var secondButtonActivation = false;
var thirdButtonActivation = false;

var col = 0;
var maxCol = 0;

var whatScreen = 1;

var devmode = false;

// For development purposesonly, makes it easier to code
if (devmode == true) {
    $("#firstScreenCont").css( "display", "none" );
    $("#secondScreenContent").css( "display", "none" );
    $("#thirdScreenContent").css( "display", "block" );
    activateButton(3)
    buttonChanger("hi", "#topBar3rdButton")
    thirdButtonActivation = true;
    assignLyrToLines()
}


onThisPage("hi", "#topBar1stButton")





/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

function to2ndScreen() {
    $("#firstScreenCont").css( "display", "none" );
    $("#secondScreenContent").css( "display", "block" );
    $("#thirdScreenContent").css( "display", "none" );
    onThisPage("de", "#topBar1stButton")
    onThisPage("hi", "#topBar2ndButton")
    onThisPage("de", "#topBar3rdButton")
    buttonChanger("de", "#topBar2ndButton")
    activateButton(2)
    whatScreen = 1;
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// Puts an underbar on top bar buttons to show you are on that screen
function onThisPage(deorhi, id) {
    if (deorhi == "hi") {
        $(id).css("border-bottom", "5px solid #2874ed")
        $(id).css("border-bottom-left-radius", "0em")
        $(id).css("border-bottom-right-radius", "0em")
    } else {
        $(id).css("border-bottom", "0px solid #2874ed")
        $(id).css("border-bottom-left-radius", "0.5em")
        $(id).css("border-bottom-right-radius", "0.5em")
    }
}

// Makes the buttons not grey
function activateButton(num) {
    if (num == 2) {
        $("#topBar2ndButtonTxt").css("color", "#22b9e3")
    } else if (num == 3) {
        $("#topBar3rdButtonTxt").css("color", "#22b9e3")
    }
}

// Highlites and dehighlites buttons to dark red as an alert
function buttonChanger(deorhi, id) {
    if (deorhi == "hi") {
        $(id).css("background-color", "#bd0019")
    } else {
        $(id).css("background-color", "")
    }
}

/////////////////////////////////////////////////////////////////////////////////////////

setInterval(function() {
    // Resizes page every 10ms
    resizeTextArea()
    // Checks to see if its ok to activate upload file button
    if (secondButtonActivation == false && document.getElementById("lyricsEnterer").value !== "") {
        secondButtonActivation = true
        buttonChanger("hi", "#topBar2ndButton")
        activateButton(2)
    }
    if ($("#thirdScreenContent").css("display") == "none") {
        $("#audioPlayerBar").css("display", "none")
    } else {
        $("#audioPlayerBar").css("display", "inline-block")
    }
}, 10)

$("#topBar2ndButton").click(function() {
    if (secondButtonActivation == true) {
        to2ndScreen()
        whatScreen = 2;
}})

// back to screen one
$("#topBar1stButton").click(function() { 
    $("#firstScreenCont").css( "display", "block" );
    $("#secondScreenContent").css( "display", "none" );
    $("#thirdScreenContent").css( "display", "none" );
    onThisPage("hi", "#topBar1stButton")
    onThisPage("de", "#topBar2ndButton")
    onThisPage("de", "#topBar3rdButton")
    whatScreen = 1;
});

// Audio loaded,
function audioLoaded() {
    procedeToThirdScreen()
    startPlaybarSync();
}
    
// 2nd ----> 3rd
function procedeToThirdScreen() {
    $("#firstScreenCont").css( "display", "none" );
    $("#secondScreenContent").css( "display", "none" );
    $("#thirdScreenContent").css( "display", "block" );
    whatScreen = 3;
}

// Click animation 
// function XXsyncedIndicator() {
//     $("#syncButton").css("border", "7px solid blue");
//     const XXoTimeout = setTimeout(XXsyncedIndicatorReset, 10)
// }
// function XXsyncedIndicatorReset() {
//     $("#syncButton").css("border", "0px solid blue")
// }

$("#lyricsEnterer").attr("placeholder", 'Copy & paste lyrics into here\nYou can find lyrics from e.g. Musixmatch')

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////



// Alerts supported formats when user clicks help
$("#supportedFormatsHelp").click(
    function() {
        alert("Supported formats:\n\naudio/wav\naudio/mp4\naudio/mpeg (mp3)\naudio/flac\naudio/aac\naudio/aacp\naudio/ogg\n\nSupported browsers:\n\nChrome (v56+)\nEdge (v79+)\nFirefox (v51+)\nOpera (v11+)\n\nSafari does NOT support (webm | ogg), \nInternet Explorer ONLY supports (flac | wav | mp3)");
    }
);
// Displays keyboard shortcuts when button pressed 
$("#hintsAB").click( function() {
    alert("Space/K: pause/play\nJ: -2s\nL: +2s\nArrow right: +5s\nArrow left: -5s\nShift: Sync Line")
})



// KEY CONTROLS
$(document).keydown( function(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    
    // if you want unicode code for any key, just un-comment this:
    // console.log(unicode)
    
    // right arrow
    if (unicode == 39) {
        seek(+5);
    } 
    // left arrow
    else if (unicode == 37) {
        seek(-5)
    } 
    else if (unicode == 74) {
        seek(-2)
    }
    else if (unicode == 76) {
        seek(+2)
    }
    else if (unicode == syncKeycutUnicode) {
        syncAction()
    }
    else if (unicode == desyncKeycutUnicode) {
        
    }
    // spacebar
    else if (unicode == 32 || unicode == 75) {
        if (audioID.paused) {
        audioID.play();
        updatePlayPauseStatus()
        } 
        else {
        audioID.pause();
        updatePlayPauseStatus()
        }
    }
});

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


// Loads audio file from uploader to player 
document.getElementById("fileSelector").addEventListener('change', (event) => {
    files = event.target.files;
    $("#srcID").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audioPlayback").load();
    $("#fileSelector").css("width", "260px");
    activateButton(3)
    buttonChanger("hi", "#topBar3rdButton")
    thirdButtonActivation = true;
});


/////////////////////////////////////////////////////////////////////////////////////////
$("#topBar3rdButton").click(function() {
    if (thirdButtonActivation == true) {
        buttonChanger("de", "#topBar3rdButton")
        onThisPage("hi", "#topBar3rdButton")
        onThisPage("de", "#topBar2ndButton")
        audioLoaded();
        procedeToThirdScreen()
        assignLyrToLines()
        whatScreen = 3;
    }
})


// Updates the play/pause button
function updatePlayPauseStatus() {
    if (playButton.html() == "Play"){
        playButton.html("Pause")
    }
    else {
        playButton.html("Play")
    }
}


// Pause button control
playButton.click( function () {
    if (playButton.html() == "Play"){
        // When Play
        audioID.play()
        playButton.html("Pause")
    }
    else {
        // When Paused
        audioID.pause()
        playButton.html("Play")
    }
});


// SEEK FUNCTIONS ---
//-10s 
$("#backwardAB").click( function() {
    seek(-10);
});
//+10s
$("#forwardAB").click( function() {
    seek(+10);
});
// Seeks by specifiec time
function seek(t) {
    audioID.currentTime = audioID.currentTime + t;
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
// tr0 tt0 tl0


// Spits each item in array to a div and then assigns an id to them
function assignLyrToLines() {
    // Empties variable
    var i = 0;
    splitLineA = [];
    splitLineA = lyrs.val().split("\n");
    var table = document.getElementById("tableElement");
    table.innerHTML = "";
    console.log(splitLineA)
    while ( i < splitLineA.length) {
        table.innerHTML += "<tr class='tableColor1'    "+ i +"    ' id='tr" + i + "'><td onclick='colChangeRequested("+i+")' class='tableColor1 tableTime' id='tt" + i + "'>0:00</td><td onclick='colChangeRequested("+i+")' class='tableColor1 tableLyrics' id='tl"+i+"'>"+splitLineA[i]+"</td></tr>"
        i++;
        console.log("number 1 run")
        if (i < splitLineA.length) {
            table.innerHTML += "<tr class='tableColor2'    "+ i +"    ' id='tr" + i+ "'><td onclick='colChangeRequested("+i+")' class='tableColor2 tableTime' id='tt" + i + "'>0:00</td><td onclick='colChangeRequested("+i+")' class='tableColor2 tableLyrics' id='tl"+i+"'>"+splitLineA[i]+"</td></tr>"
            i++;
            console.log("number 2 run")
        }
    }
}

function colourCol() {
    $("#tl"+col).css("color", "#00aeff");
    $("#tt"+col).css("color", "#00aeff");
    maxCol
}

function colChangeRequested(i) {
    if (i < maxCol) {
        $("#tl"+col).css("color", "#ff2626")
        $("#tt"+col).css("color", "#ff2626")
    } else {
        $("#tl"+col).css("color", "#FFFFFF")
        $("#tt"+col).css("color", "#FFFFFF")
    }
    col = i;
    colourCol()
}

// RUNS EVERY 10MS
// Every 10ms
var percentageProgress;
function startPlaybarSync() {
    setInterval( function() {
        // changes the playback bar to the correct position IF barUpdateClearance == true
        // as in, if user isnt holding down mouse on the playback bar it flows normally
        if (barUpdateClearance == true) {
            percentageProgress = (audioID.currentTime/audioID.duration)
            rangeBar.value = percentageProgress * 1000;
        }
        // If user isnt holding down mouse on playback bar it syncs time normally
        if (barUpdateClearance == true) {
            setPlaybackTime( formatTime(audioID.currentTime) );
        }
        // Just a development tool to see the value of the playback bar
        if (barUpdateClearance == false && devmode == true) {
            $("#mainH").html(rangeBar.value)
        }
        if (barUpdateClearance == false) {
            setPlaybackTime( formatTime( (rangeBar.value/1000)*audioID.duration ) );
        }
        resizeTextArea()
    } , 10);
}


// Holding down mouse click on the bar
function noClearance() {
    barUpdateClearance = false
    audioID.pause()
}

// Mouse click let go off bar
function yesClearance() {
    barUpdateClearance = true
    setTimeToCurrentSliderValue()
}


// Sets time when called
function setPlaybackTime(time) {
    $("#timeDisplay").html(time)
}

//Formats seconds into minutes:seconds and returns it that way
function formatTime(time) {
    var minutes, seconds, formated; 
    time = Math.floor(time);
    minutes = Math.floor(time/60);
    seconds = time % 60;
    if (seconds.toString().length == 1) {
        seconds = "0" + seconds 
    }
    formated = minutes + ":" + seconds
    return(formated)
}

// Sets the actual audio to the time which the user selected on the playback bar
function setTimeToCurrentSliderValue() {
    audioID.currentTime = Math.floor((rangeBar.value/1000) * audioID.duration)
}

// When triggered by HTML volume slider, it changes volume to what the slider is
function onVolChange() {
    // alert("changed " + volumeSlider.value)
    audioID.volume = volumeSlider.value/50 ;
}

// Runs syncAction() when sync action is clicked
$("#syncButton").click( function() {
    syncAction()
});

function toDp(toChange) {
    return toChange.toFixed(3)
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// syncAction() is triggured when sync button or shortcut key clicked 
function syncAction() {
    syncNewLine()
} 
// As normal, advances the sync process 
function syncNewLine() {
    $("#tt"+col).css("color", "#ff2626");
    $("#tt"+col).html(formatTime(audioID.currentTime));
    $("#tl"+col).css("color", "#ff2626");


    timeStamps[col] = audioID.currentTime;
    recordArray[col] = 1;
    if (maxCol < col) {
        maxCol = col
    }
    col++;
    colourCol()
}

// Either updates which line the user is currently on or returns which line thet are on, line 1 has an lDID0
function lineIndex(param) {
    console.log("lineIndex("+ param+")")
    if (param == "lineID") {
        return "lDID"+globalLineID
    } else if (param == "timeID") {
        return "tDID"+globalLineID
    } else if (param == "y") {
        return globalLineID;
    } else {
        globalLineID = globalLineID + param
    }
}



// Colors lines and 
function colorSelectedLine(lineID) {
    $("#"+lineID).css("color", "#ff2626")
}
function decolorSelectedLine(lineID) {
    $("#"+lineID).css("color", "#ffffff")
}
function assignSelectedTime(timeID) {
    console.log("assignSelectedTime("+timeID+")")
    $("#"+timeID).html(formatTime(audioID.currentTime))
    timeStamps[lineIndex("y")] = toDp(audioID.currentTime + timeOffset)
    console.log(timeStamps) 
} 


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


// Converts given time (in seconds) to format "[mm:ss:ms]"
function convertTimeToLrcFormat(time) {
    var minutes, seconds, ms, formated; 
    minutes = Math.floor(time/60);
    seconds = Math.floor(time % 60);
    ms = ( time - Math.floor(time) ) * 100
    ms = Math.floor(ms)
    // console.log(ms)
    if (seconds.toString().length == 1) {
        seconds = "0" + seconds 
    }
    if (minutes.toString().length == 1) {
        minutes = "0" + minutes 
    }
    if (ms.toString().length == 1 ) {
        ms = "0" + ms 
    }
    // console.log(ms)
    formated = ""+minutes + ":" + seconds + "." + ms + "]"
    return(formated)
}

// thanks to https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();
    
    document.body.removeChild(element);
}

function finishItOff() {
    var i = 0;
    songName = $("#songNameInput").val();
    artistName = $("#artistNameInput").val();
    completed = "[ti: ";
    completed += songName + "]\n" + "[ar: " + artistName + "]\n[tool: github-DBKarman-Lyricsync]\n[length: "+ convertTimeToLrcFormat(audioID.duration) +"\n\n"
    while (i < splitLineA.length) {
        completed += "["+convertTimeToLrcFormat(timeStampsVerify(timeStamps[i])) + " " + splitLineA[i] + "\n" 
        i++;
        if (i == splitLineA.length) {
            download("lyrics.lrc", completed);
        }
    }
}



function timeStampsVerify(timeStamp) {
    if (timeStamp) {
        return timeStamp
    } else {
        return 0;
    }
}


$("#downloadAB").click( function() {
    finishItOff()
} )



// Note about how updating the bar works,
// its a janky process, but idk how to do any better
// because its a HTML INPUT TYPE RANGE slider used for playback bar, its a process a -
// process and a half to allow both the program to update it and also the user to click -
// somewhere and go there, like i said, i dont know how to do any better :/
// In order to not conflict startPlaybarSync() with the user clicking the playback bar, -
// startPlaybarSync() can only update the playbar if barUpdateClearance = true; it is set to -
// when the user is clicking the bar, 

var topBarSize = 53
function resizeTextArea() {
    var tbHeight;
    // console.log(document.body.clientHeight)
    tbHeight = ($(window).height() - topBarSize) 
    // console.log(tbHeight)
    $("#lyricsEnterer").css("height", tbHeight+"px")
    // console.log("resizeTextArea(), getHeight(): "  + getHeight() + " | tbHeight: " + tbHeight )
}