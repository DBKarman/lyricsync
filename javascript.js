var songName = "";
var artistName = "";
var numOfLines = 0
var audioID = document.getElementById('audioPlayback');
var playButton = $("#playAB");
var rangeBar = document.getElementById("audioPlaybackBar");
var permaPause = true;
var barUpdateClearance = true;
var lyrs = $("#lyricsEnterer").val();
var lyricsEntered = $("#lyricsEnterer");
var lyrBoardID = document.getElementById("lyrBoard");
var lyrBoardTimeID = document.getElementById("lyrBoardTime")
var globalLineID = 0;
var timeOffset = -0.2;
var timeStamps = new Array();
var splitLineA = new Array();
var completed;

var devmode = false;

var syncKeycutUnicode = 16;
var desyncKeycutUnicode = 8;


// For development purposesonly, makes it easier to code
if (devmode == true) {
    $("#firstScreenCont").css( "display", "none" );
    $("#secondScreenContent").css( "display", "block" );
    $("#thirdScreenContent").css( "display", "block" );
}


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
//                      PAGE CONTROLS AND FUNCTIONs
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// when called it hides second screen and goes to third screen
function procedeToThirdScreen() {
    if (devmode == false) {
        $("#secondScreenContent").css( "display", "none" );
        $("#thirdScreenContent").css( "display", "block" );
    }
}

//Moves to second screen after lyrics are submitted
$("#submitLyrics").click(
    function() {
        if (devmode == false) {
            $("#firstScreenCont").css( "display", "none" );
            $("#secondScreenContent").css( "display", "block" );
        }
        // Assigns every line to string separatly
    }
);

//Shows supported formats when user clicks help
$("#supportedFormatsHelp").click(
    function() {
        alert("Supported formats:\n\naudio/wav\naudio/mp4\naudio/mpeg (mp3)\naudio/flac\naudio/aac\naudio/aacp\naudio/ogg\n\nSupported browsers:\n\nChrome (v56+)\nEdge (v79+)\nFirefox (v51+)\nOpera (v11+)\n\nSafari does NOT support (webm | ogg), \nInternet Explorer ONLY supports (flac | wav | mp3)");
    }
);

// Displays keyboard shortcuts when button pressed 
$("#hintsAB").click( function() {
    alert("Space/K: pause/play\nJ: -2s\nL: +2s\nArrow right: +5s\nArrow left: -5s\n")
})

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
//                       Audio controls and playback
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// Loads audio file from uploader to player 
document.getElementById("fileSelector").addEventListener('change', (event) => {
    files = event.target.files;
    $("#srcID").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audioPlayback").load();
    audioLoaded()
});

// Updates the button when it is controlled through means other htan a click, such as spacebar press
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

// Executes when audio is successfully loaded from file dropper to player
function audioLoaded() {
    // if (devmode==true) {alert("executed");} 
    // Executes the startPlaybarSync() function with setIntrival() which control pretty much everything
    assignLyrToLines()
    procedeToThirdScreen()
    startPlaybarSync();

}

//-10s and +10s
$("#backwardAB").click( function() {
    seek(-10);
});
$("#forwardAB").click( function() {
    seek(+10);
});

// Seeks by specifiec time
function seek(t) {
    audioID.currentTime = audioID.currentTime + t;
}


// Note about how updating the bar works,
// its a janky process, but idk how to do any better
// because its a HTML INPUT TYPE RANGE slider used for playback bar, its a process a -
// process and a half to allow both the program to update it and also the user to click -
// somewhere and go there, like i said, i dont know how to do any better :/
// In order to not conflict startPlaybarSync() with the user clicking the playback bar, -
// startPlaybarSync() can only update the playbar if barUpdateClearance = true; it is set to -
// when the user is clicking the bar, 

//Called when holding down mouse click on the bar
function noClearance() {
    barUpdateClearance = false
    audioID.pause()
}

//Called when mouse click is let go of bar
function yesClearance() {
    barUpdateClearance = true
    setTimeToCurrentSliderValue()
    audioID.play()
}

// syncedIndicator() changes it to blue bordered before changing back after 10ms
function XXsyncedIndicator() {
    $("#syncButton").css("border", "7px solid blue");
    const XXoTimeout = setTimeout(XXsyncedIndicatorReset, 10)
}
function XXsyncedIndicatorReset() {
    $("#syncButton").css("border", "0px solid blue")
}

// Once called, it runs all inside it every 10 milliseconds
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
    } , 10);
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
//                       Assignment of array to #lyrBoard
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// syncAction() is triggured when sync button or shortcut key clicked 
function syncAction() {
    XXsyncedIndicator()
    syncNewLine()
} 

// As normal, advances the sync process 
function syncNewLine() {
    colorSelectedLine( lineIndex("lineID") )
    colorSelectedLine( lineIndex("timeID") )
    assignSelectedTime( lineIndex("timeID") )
    lineIndex(+1)
}

// Either updates which line the user is currently on or returns which line thet are on, line 1 has an lDID0
function lineIndex(param) {
    console.log("lineIndex("+ param+")")
    if (param == "lineID") {
        return "lDID"+globalLineID
    } else if (param == "timeID") {
        return "tDID"+globalLineID
    } else if (param == "i") {
        return globalLineID;
    } else {
        globalLineID = globalLineID + param
    }
}


function colorSelectedLine(lineID) {
    $("#"+lineID).css("color", "#ff0000")
}
function decolorSelectedLine(lineID) {
    $("#"+lineID).css("color", "#ffffff")
}
function assignSelectedTime(timeID) {
    console.log("assignSelectedTime("+timeID+")")
    $("#"+timeID).html(formatTime(audioID.currentTime))
    timeStamps[lineIndex("i")] = toDp(audioID.currentTime + timeOffset)
    console.log(timeStamps) 
} 

// Spits each item in array to a div and then assigns an id to them
var i;
function assignLyrToLines() {
    i = 0;
    lyrs = $("#lyricsEnterer").val();
    splitLineA = lyrs.split("\n");
    lyrBoardID.innerHTML = "";
    lyrBoardTimeID.innerHTML = "";
    while ( i < splitLineA.length) {
        lyrBoardID.innerHTML += "<span class='lyrDivSpan' id='lDID"+i+"'>" + splitLineA[i] + "</span>" + "<br>";
        lyrBoardTimeID.innerHTML += "<span id='tDID"+i+"' class='loopAddedTime'>" + "0:00" + "</span><br>"
        i++;
    }
}

// Gets the unicode on keypress and then, using the unicode, of the key pressed, looks for a match
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
//                              Generation of file
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
    console.log(ms)
    formated = "["+minutes + ":" + seconds + ":" + ms + "]"
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
    i = 0
    songName = $("#songNameInput").val()
    artistName = $("#artistNameInput").val()
    completed = "[ti:";
    completed += songName + "]\n" + "[ar:" + artistName + "]\n[by:github-DBKarman-Lyricsync]\n\n"  
    console.log(completed)
    while (i < splitLineA.length) {
        completed += convertTimeToLrcFormat(timeStamps[i]) + "" + splitLineA[i] + "\n" 
        console.log(completed)
        i++
        if (i == splitLineA.length) {
            download("lyrics.lrc", completed);
        }
    }
}

$("#downloadAB").click( function() {
    finishItOff()
} )