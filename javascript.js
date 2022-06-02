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



/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
// run at the start
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


onThisPage("hi", "#topBar1stButton")

$("#lyricsEnterer").attr("placeholder", 'Copy & paste lyrics into here\nYou can find lyrics from e.g. Musixmatch')

cogDisplay("hide")




/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
// To do with changing screens
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// back to screen one button
$("#topBar1stButton").click(function() { 
    $("#firstScreenCont").css( "display", "block" );
    $("#secondScreenContent").css( "display", "none" );
    $("#thirdScreenContent").css( "display", "none" );
    onThisPage("hi", "#topBar1stButton")
    onThisPage("de", "#topBar2ndButton")
    onThisPage("de", "#topBar3rdButton")
    whatScreen = 1;
});

// Run when upload file button is clicked
$("#topBar2ndButton").click(function() {
    if (secondButtonActivation == true) {
        to2ndScreen()
        whatScreen = 2;
}})

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

$("#topBar3rdButton").click(function() {
    if (thirdButtonActivation == true) {
        buttonChanger("de", "#topBar3rdButton")
        onThisPage("hi", "#topBar3rdButton")
        onThisPage("de", "#topBar2ndButton")
        audioLoaded();
        cogDisplay("show")
        procedeToThirdScreen()
        assignLyrToLines()
        whatScreen = 3;
        cogDisplay("show")
    }
})

// Makes the buttons not grey
function activateButton(num) {
    if (num == 2) {
        $("#topBar2ndButtonTxt").css("color", "#22b9e3")
    } else if (num == 3) {
        $("#topBar3rdButtonTxt").css("color", "#22b9e3")
    }
}

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
// Highlites and dehighlites buttons to dark red as an alert
function buttonChanger(deorhi, id) {
    if (deorhi == "hi") {
        $(id).css("background-color", "#930000")
    } else {
        $(id).css("background-color", "")
    }
}

// Shows and hides the cog image at the top of the screen
function cogDisplay(what) {
    if (what == "hide") {
        $("#topBarSettings").css("display", "none")
        $("#buttonsCont").css("width", "332px")
    } else if (what == "show") {
        $("#topBarSettings").css("display", "inline-block")
        $("#buttonsCont").css("width", "370px")
    }
}


    
// run when moving from 2nd to 3rd screen
function procedeToThirdScreen() {
    $("#firstScreenCont").css( "display", "none" );
    $("#secondScreenContent").css( "display", "none" );
    $("#thirdScreenContent").css( "display", "block" );
    whatScreen = 3;
}

//Hides and displays time offset menu
$("#topBarSettings").click(function() {
    $("#cogPopup").css("display", "block")
})
$("#cogPopupXX").click(function() {
    $("#cogPopup").css("display", "none")
})

// Alerts supported formats when user clicks help
$("#supportedFormatsHelp").click(
    function() {
        alert("Supported formats:\n\naudio/wav\naudio/mp4\naudio/mpeg (mp3)\naudio/flac\naudio/aac\naudio/aacp\naudio/ogg\n\nSupported browsers:\n\nChrome (v56+)\nEdge (v79+)\nFirefox (v51+)\nOpera (v11+)\n\nSafari does NOT support (webm | ogg), \nInternet Explorer ONLY supports (flac | wav | mp3)");
    }
);
// Displays keyboard shortcuts when button pressed 
$("#hintsAB").click( function() {
    alert("Space/K: pause/play\nJ: -2s\nL: +2s\nArrow right: +5s\nArrow left: -5s\nShift: Sync Line\nClicking on a timestamp also works")
})



// Resizes the lyrics enterer to fit the screen
var topBarSize = 60
function resizeTextArea() {
    var tbHeight;
    tbHeight = ($(window).height() - topBarSize) 
    // console.log(tbHeight)
    $("#lyricsEnterer").css("height", tbHeight+"px")
    // console.log("resizeTextArea(), getHeight(): "  + getHeight() + " | tbHeight: " + tbHeight )
}




/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
// Audio stuff
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// Audio loaded,
function audioLoaded() {
    procedeToThirdScreen()
    startPlaybarSync();
    audioID.currentTime = 0;
}

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

// If audio is playing it sets it as playing otherwise it sets it as paused
function updatePlayPauseText() {
    if (!audioID.paused) {
        playButton.html("Pause")
    } else {
        playButton.html("Play")
    }
}

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

// Sets the actual audio to the time which the user selected on the playback bar
function setTimeToCurrentSliderValue() {
    audioID.currentTime = Math.floor((rangeBar.value/1000) * audioID.duration)
}

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

// When triggered by HTML volume slider, it changes volume to what the slider is
function onVolChange() {
    // alert("changed " + volumeSlider.value)
    audioID.volume = volumeSlider.value/50 ;
}

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

// Holding down mouse click on the bar
function noClearance() {
    barUpdateClearance = false
    audioID.pause()
}

// Mouse click let go off bar
function yesClearance() {
    barUpdateClearance = true
    setTimeToCurrentSliderValue()
    audioID.play()
    updatePlayPauseText()
}


// Sets time when called
function setPlaybackTime(time) {
    $("#timeDisplay").html(time)
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
// Intrivals
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// Run every 10ms
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

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
// To do with making and editing the table
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


// Spits each item in array to a div and then assigns an id to them
function assignLyrToLines() {
    // Empties variable
    var i = 0;
    splitLineA = [];
    splitLineA = lyrs.val().split("\n");
    var table = document.getElementById("tableElement");
    table.innerHTML = "";
    while ( i < splitLineA.length) {
        table.innerHTML += "<tr class='tableColor1'    "+ i +"    ' id='tr" + i + "'><td onclick='colChangeRequested("+i+")' class='tableColor1 tableTime' id='tt" + i + "'>0:00.00</td><td onclick='colChangeRequested("+i+")' class='tableColor1 tableLyrics' id='tl"+i+"'>"+splitLineA[i]+"</td></tr>"
        i++;
        if (i < splitLineA.length) {
            table.innerHTML += "<tr class='tableColor2'    "+ i +"    ' id='tr" + i+ "'><td onclick='colChangeRequested("+i+")' class='tableColor2 tableTime' id='tt" + i + "'>0:00.00</td><td onclick='colChangeRequested("+i+")' class='tableColor2 tableLyrics' id='tl"+i+"'>"+splitLineA[i]+"</td></tr>"
            i++;
        }
        if (i == splitLineA.length) {console.log("Emptied splitLineA[] to table")}
    }
}

function colChangeRequested(i) {

    console.log(i)
    console.log(recordArray[i])

    
    if (recordArray[col] == 1) {
        $("#tl"+col).css("color", "#ff2626")
        $("#tt"+col).css("color", "#ff2626")
    } else {
        $("#tl"+col).css("color", "#FFFFFF")
        $("#tt"+col).css("color", "#FFFFFF")
    }
    
    col = i;
    
    colourCol()
}

function colourCol() {
    $("#tl"+col).css("color", "#00aeff");
    $("#tt"+col).css("color", "#00aeff");
    maxCol
}

function toDp(toChange) {
    return toChange.toFixed(3)
}


// Runs syncAction() when sync action is clicked
$("#syncButton").click( function() {
    syncAction()
});
// syncAction() is triggured when sync button or shortcut key clicked 
function syncAction() {
    syncNewLine()
} 

// As normal, advances the sync process 
function syncNewLine() {
    $("#tt"+col).css("color", "#ff2626");
    $("#tt"+col).html( formatTimePrecise( audioID.currentTime + timeOffsetFunc() ) );
    $("#tl"+col).css("color", "#ff2626");

    timeStamps[col] = audioID.currentTime + timeOffsetFunc();
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

// Offsets the time as specified by the user
function timeOffsetFunc() {
    return -$("#cogPopupSelect").val()
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



//Formats seconds into minutes:seconds:ms and returns it that way
function formatTimePrecise(time) {
    var floored, minutes, seconds, ms, formated; 

    // To not break the code
    if (time < 0) {time = 0}

    floored = Math.floor(time);
    minutes = Math.floor(floored/60);
    seconds = floored % 60;
    ms = (time - Math.floor(time)).toFixed(2)
    ms = ms * 100


    minutes = Math.floor(minutes)
    seconds = Math.floor(seconds)
    ms = Math.floor(ms)


    // If the offset of time made it negative, makes it 0
    if (minutes < 0) {minutes = 0}
    if (seconds < 0) {seconds = 0}
    if (ms < 0) {ms = 0}


    // if seconds or ms are 1 digit only, makes it 2 digit
    if ( seconds.toString().length == 1 ) {
        seconds = "0" + seconds 
    }
    if ( ms.toString().length == 1) {
        ms = ms + "0"
    }

    formated = minutes + ":" + seconds + "." + ms
    return(formated)
}



/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
// Finishing off
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

// If an item in timeStamp[] is empty, it prints "NaN" to the .lrc file, this replaces it with 00:00.00
function timeStampsVerify(timeStamp) {
    if (timeStamp) {
        return timeStamp
    } else {
        return 0;
    }
}

// When "Generate File" button clicked
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

