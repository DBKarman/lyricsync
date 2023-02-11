

const j$ = (id) => { return document.getElementById(id);}

//on load the lyricsTextArea height is changed because css cant do it for some reason
addEventListener("load", (event) => {
    $("#lyricsTextArea").css("height", (window.innerHeight - 68) + "px");
});
//on window resize the lyricsTextArea height is changed because css cant do it for some reason
addEventListener("resize", (event) => {
    $("#lyricsTextArea").css("height", (window.innerHeight - 68) + "px");
});

//sets placeholder for the big textarea on the first screen
$("#lyricsTextArea").attr("placeholder", 'Copy & paste lyrics into here\nYou can find lyrics from e.g. Musixmatch');

//checks whether the required things have been done before allowing access to other screens
//isTopBarButtonAccessible[0] = enterLyricsScreen, corresponding button: topBarEntryLyricsButton
//isTopBarButtonAccessible[1] = uploadFileScreen, corresponding button: topBarUploadFileButton
//isTopBarButtonAccessible[2] = syncLyricsScreen, corresponding button: topBarSyncLinesButton
var isTopBarButtonAccessible = [true, false, false];

//buts a line under the chosen topBar button to highlite youre on that screen
function highliteTopBarButton(dehighliteOrHighlite, buttonId) {
    //if the element with id buttonId does not exist
    if (!document.getElementById(buttonId)) { // trow error
        alert("Error thrown, check logs.");
        throw new Error("Parameter buttonId has value" + buttonId + 
        "\nof which a corresponding element with ID was not found.");
    }


    if (dehighliteOrHighlite == "highlite") {
        $("#"+buttonId).css("border-bottom", "5px solid #2874ed");
        $("#"+buttonId).css("border-bottom-left-radius", "0em");
        $("#"+buttonId).css("border-bottom-right-radius", "0em");
    } else if (dehighliteOrHighlite == "dehighlite") {
        $("#"+buttonId).css("border-bottom", "0px solid #2874ed");
        $("#"+buttonId).css("border-bottom-left-radius", "0.5em");
        $("#"+buttonId).css("border-bottom-right-radius", "0.5em");
    } else {
        alert("Error thrown, check logs.");
        throw new Error("Parameter dehighliteOrHighlite has value " + dehighliteOrHighlite + 
        "\nof which is not a valid, only 'highlight' or 'dehighlight' are valid parameters.");
    }
}

//highlites the enterLyricsScreen button because thats the sreen the user is on at the start
highliteTopBarButton("highlite", "topBarEntryLyricsButton");

//just a tracker to keep track of what screen the user is on, set to 1 because thats the sreen the user is on at the start
var whatScreenIsUserCurrentlyOn = 1;

//highlites the button in red so the user knows they can now click on it
function redHighliteTopBarButton(dehighliteOrHighlite, buttonId) {
    //if the element with id buttonId does not exist
    if (!document.getElementById(buttonId)) { // trow error
        alert("Error thrown, check logs.");
        throw new Error("Parameter buttonId has value" + buttonId + 
        "\nof which a corresponding element with ID was not found.");
    }


    if (dehighliteOrHighlite == "highlite") {
        $("#"+buttonId).css("background-color", "#930000");
    } else if (dehighliteOrHighlite == "dehighlite") {
        $("#"+buttonId).css("background-color", "");
    }


    else {
        alert("Error thrown, check logs.");
        throw new Error("Parameter dehighliteOrHighlite has value" + dehighliteOrHighlite + 
        "\nof which a corresponding element with ID was not found.");
    }
}

//when the user enters something into the text area grant them access to the 2nd screen and redHighlite it
j$("lyricsTextArea").addEventListener('input', (event) => {
    redHighliteTopBarButton("highlite", "topBarUploadFileButton");
    isTopBarButtonAccessible[1] = true;
});

//Hides and displays time offset menu
$("#topBarSettings").click(function() {
    $("#topBarSettingsPopup").css("display", "block");
});
$("#cogPopupCloseX").click(function() {
    $("#topBarSettingsPopup").css("display", "none");
});


//hides everything on the first screen
function hideScreen1() {
    $("#enterLyricsScreen").css("display", "none");
}
//hides everything on the first screen
function hideScreen2() {
    $("#uploadFileScreen").css("display", "none");
}
//hides everything on the first screen
function hideScreen3() {
    $("#syncLyricsScreen").css("display", "none");
    $("#audioPlayerBar").css("display", "none");
}


//hides everything on the first screen
function showScreen1() {
    $("#enterLyricsScreen").css("display", "block");
}
//hides everything on the first screen
function showScreen2() {
    $("#uploadFileScreen").css("display", "block");
}
//hides everything on the first screen
function showScreen3() {
    $("#syncLyricsScreen").css("display", "block");
    $("#audioPlayerBar").css("display", "block");
}


function topBarUploadFileButtonClicked() {
    //check whether the user is allowed to click it
    if (isTopBarButtonAccessible[1] == true) {
        //(red) dehighlite al buttons
        redHighliteTopBarButton("dehighlite", "topBarEntryLyricsButton");
        redHighliteTopBarButton("dehighlite", "topBarUploadFileButton");
        redHighliteTopBarButton("dehighlite", "topBarSyncLinesButton");

        //dehighlite first and last button
        highliteTopBarButton("dehighlite", "topBarEntryLyricsButton");
        highliteTopBarButton("dehighlite", "topBarSyncLinesButton");

        //highlite that button 
        highliteTopBarButton("highlite", "topBarUploadFileButton");

        //whatScreenIsUserCurrentlyOn = 2
        whatScreenIsUserCurrentlyOn = 2;

        //hide screen 1 and 3 and show screen 2
        hideScreen1(); hideScreen3(); showScreen2();

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
    }
}


//when the user clicks on the topBarUploadFileButton button,
$("#topBarUploadFileButton").click(
    () => {
        topBarUploadFileButtonClicked();
    }
);

//when the user successfully uploads a file into the fileSelector
j$("fileSelector").addEventListener('change', (event) => {
    //loads the file from fileSelector to audioPlayback
    files = event.target.files;
    $("#audioPlaybackAudioSourceID").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audioPlayback").load();
    //changes the width of the fileSelector to allow space for the file name
    $("#fileSelector").css("width", "260px");
    //activate the third button
    redHighliteTopBarButton("highlite", "topBarSyncLinesButton");
    isTopBarButtonAccessible[2] = true;
});

//run when the topBarSyncLinesButton button is clicked
function topBarSyncLinesButtonClicked() {
    //check whether the user is allowed to click it
    if (isTopBarButtonAccessible[2] == true) {
        //(red) dehighlite al buttons
        redHighliteTopBarButton("dehighlite", "topBarEntryLyricsButton");
        redHighliteTopBarButton("dehighlite", "topBarUploadFileButton");
        redHighliteTopBarButton("dehighlite", "topBarSyncLinesButton");

        //dehighlite first and second button
        highliteTopBarButton("dehighlite", "topBarEntryLyricsButton");
        highliteTopBarButton("dehighlite", "topBarUploadFileButton");
        
        //highlite that button 
        highliteTopBarButton("highlite", "topBarSyncLinesButton");

        //whatScreenIsUserCurrentlyOn = 3
        whatScreenIsUserCurrentlyOn = 3;

        //hide screen 1 and 2 and show screen 3
        hideScreen1(); hideScreen2(); showScreen3();
    }
}

//when the user clicks on the topBarSyncLinesButton button,
$("#topBarSyncLinesButton").click(
    () => {
        topBarSyncLinesButtonClicked();
        assignLyricsToLinesInTable();
        //determines whether the user is syncing or previewing
        beginUserSyncingLinesIntrival();
        //begins syncing the playbar
        beginSyncingPlaybar();
        //we want to start off with the first element so
        tableLineClicked(0);
        //alerts the user with the help sheet
        //$("#hintsButton").click();
    }
);

//screen 1 button clicked
$("#topBarEntryLyricsButton").click(() => {
    topBarEntryLyricsButtonClicked();
})

function topBarEntryLyricsButtonClicked() {
    //(red) dehighlite al buttons
    redHighliteTopBarButton("dehighlite", "topBarEntryLyricsButton");
    redHighliteTopBarButton("dehighlite", "topBarUploadFileButton");
    redHighliteTopBarButton("dehighlite", "topBarSyncLinesButton");

    //highlite that button 
    highliteTopBarButton("highlite", "topBarEntryLyricsButton");
    //dehighlite 2nd and 3rd button
    highliteTopBarButton("dehighlite", "topBarUploadFileButton");
    highliteTopBarButton("dehighlite", "topBarSyncLinesButton");
    

    //whatScreenIsUserCurrentlyOn = 1
    whatScreenIsUserCurrentlyOn = 1;

    //hide screen 1 and 2 and show screen 3
    hideScreen2(); hideScreen3(); showScreen1();
}

//takes unique id and lyrics as parameters and returns a finished line to insert into the table,
let tableLineSkeleton = (uniqueID, lyrics, timeStamp) => { 
    
    var backgroundColor = uniqueID%2;

    //add a class to each row of the table
    line = "<tr class='tableLine' " + 
    //add a unique id to each row of the table 
    "id='tableLineIndex" + uniqueID + "'>" +
        //Table Time Columns:
            //add an onclick event to each table columns which also passes its unique id to each function so we can know which item was clicked
            "<td <!--onclick='tableLineClicked("+uniqueID+")-->'"+
            //add a class of tableColumns and tableTimeColumns
            "class='tableColumns tableTimeColumns tableRowBackgroundColour" + backgroundColor +"' "+
            //add unique id to each time column
            "id='tableTimeColumn" + uniqueID + "'>"+timeStamp+"</td> " + 
        //Edit Time Table Image
            "<td id='tableEditButtonColumn" + uniqueID + "' class='tableEditButtonColumnClass tableColumns tableRowBackgroundColour" + backgroundColor +"' onclick='tableLineDblClicked("+uniqueID+")'>" +
            "<img class='tableEditButtonImageClass' src='pen-icon.png' alt='' >" +
            "</td>" +
        //Add Time Table Image
            "<td id='tableAddButtonColumn" + uniqueID + "' class='tableEditButtonColumnClass tableColumns tableRowBackgroundColour" + backgroundColor +"' onclick='addNewLineAfterIndex("+uniqueID+")'>" +
            "<img class='tableEditButtonImageClass' src='add-icon.png' alt='' >" +
            "</td>" +
        //Remove Time Table Image
        //removeLineAtIndex
            "<td id='tableRemoveButtonColumn" + uniqueID + "' class='tableEditButtonColumnClass tableColumns tableRowBackgroundColour" + backgroundColor +"' onclick='removeLineAtIndex("+uniqueID+")'>" +
            "<img class='tableEditButtonImageClass' src='remove-icon.png' alt='' >" +
            "</td>" +
        //Table Lyrics Columns:
            //add an onclick event to each table columns which also passes its unique id to each function so we can know which item was clicked
            "<td onclick='tableLineClicked("+uniqueID+")' " +
            //add double click event listener
            " ondblclick='tableLineDblClicked("+uniqueID+")' "+ 
            //add a class of tableColumns and tableLyricsColumns and an alternating 1 or 0 for backgroundColor
            "class='tableColumns tableLyricsColumns tableRowBackgroundColour" + backgroundColor +"' "+
            //add unique id to each time column
            "id='tableLyricsColumn"+uniqueID+"'>"+
            //insert the lyrics into the tableLyricsColumn
            ""+lyrics+"</td>" + 
    "</tr>";
    return line;
}

//holds the timespamps
var timeStamps = [];

//new array to store the lyrics lines
var lyricsLines = [];

// Spits each item in array to a div and then assigns an id to them
function assignLyricsToLinesInTable() {
    //assign each line in lyricsTextArea to lyricsLines
    if (developerTools && developerTools == true) {
        //DEVELOPER TOOL
        lyricsLines = testLyrics.split("\n");
    } else {
        lyricsLines = $("#lyricsTextArea").val().split("\n");
    }
    // just a shortcut to access the lyricsTable which will store the lines
    let table = document.getElementById("lyricsTable");
    //clearts the innerHTML of the table
    table.innerHTML = "";

    //go through every element in lyricsLines and uses the tableLineSkeleton function to create valid html and insert it into the table
    for (i = 0; i < lyricsLines.length; i++) {
        table.innerHTML += tableLineSkeleton(i, lyricsLines[i], "0:00.00")
        //console logs out when the for loop ends
        if (i == lyricsLines.length) {console.log("Emptied lyricsLines to table")}
    }
}

function tableLineClicked(rowId) {
    //if the user is editing a line do nothing 
    if (rowId == editingWhatElement) {
        //do nothing because we dont want to disturb the editing of a line
    } else {
        //change the global variable selectedTableRow to roId
        selectedTableRow = rowId;
        //sets all rows to white
        formatTheWholeTable();
        //just incase the user was editing another element we finish editing it
        finishEditingElement();
    }
}

var editingWhatElement = -1;
function tableLineDblClicked(rowId) {
    //just incase the user was editing another element we finish editing it
    finishEditingElement();
    //set editingWhatElement to rowIf
    editingWhatElement = rowId;
    //get the lyrics inside the line
    var lyricsInsideLine = j$("tableLyricsColumn"+rowId).innerHTML;
    //make an input type text with no intitial value because any value we set to it till mess up if theres any ' or " inside the value we give"
    var inputTypeText = "<input class='tableLyricsColumnInput' type='text' id='tableLyricsColumnInput"+rowId+"'>";
    //replace the value of the <td></td> with inputTypeText
    j$("tableLyricsColumn"+rowId).innerHTML = inputTypeText;
    //add the value now
    $("#tableLyricsColumnInput"+rowId).val(lyricsInsideLine);
}

//finishes editing the element after a double click
function finishEditingElement() {
    //if editingWhatElement is not -1 and the element with id tableLyricsColumnInput+editingWhatElement exists then continue
    if (editingWhatElement != -1 &&	 j$("tableLyricsColumnInput"+editingWhatElement) != null ) {
        //take the value of "tableLyricsColumnInput"+editingWhatElement and store it
        let tableLyricsColumnInputValue = j$("tableLyricsColumnInput"+editingWhatElement).value;
        //replace the contents of "tableLyricsColumn"+editingWhatElement with tableLyricsColumnInputValue
        j$("tableLyricsColumn"+editingWhatElement).innerHTML = tableLyricsColumnInputValue;
        //replace the lyrics inside lyricsLines array
        lyricsLines[editingWhatElement] = tableLyricsColumnInputValue;
        //change the global variable to indicate not editing any lines
        editingWhatElement = -1;
    }
}

// $(".tableColumns").dblclick(() => {
//     alert("You double clicked");
// })

//IMPORTANT GLOBAL VARIABLE
//the table row id of which the user is currently settings the time stamp 
var selectedTableRow = 0;

//sets the colour of the row of which the table row the user is setting the time stamp to to BLUE
function colorTableRowBlue(rowId) {
    $("#tableTimeColumn"+rowId).css("color", "rgb(0, 174, 255)")
    $("#tableLyricsColumn"+rowId).css("color", "rgb(0, 174, 255)")
}

//sets the colour of the row of which the table row the user is setting the time stamp to to WHITE
function colorTableRowWhite(rowId) {
    $("#tableTimeColumn"+rowId).css("color", "#ffffff")
    $("#tableLyricsColumn"+rowId).css("color", "#ffffff")
}

//sets the colour of the row of which the table row the user is setting the time stamp to to RED
function colorTableRowRed(rowId) {
    $("#tableTimeColumn"+rowId).css("color", "#ff2626");
    $("#tableLyricsColumn"+rowId).css("color", "#ff2626");
}

function colorTableRowBackgroundBlue(rowId) {
    $("#tableTimeColumn"+rowId).css("background-color", "#074685");
    $("#tableLyricsColumn"+rowId).css("background-color", "#074685");
}

function decolorTableRowBackgroundBlue(rowId) {
    $("#tableTimeColumn"+rowId).css("background-color", "");
    $("#tableLyricsColumn"+rowId).css("background-color", "");
}

/////////////////////
//Audio stuff
/////////////////////
//shortcut variable, so we dont type document.getElementById("audioPlayback") every time we use it
let audio = document.getElementById("audioPlayback");

//when the play button is clicked
$("#playButton").click(
    () => {
        playButtonCLicked();
    }
)

function playButtonCLicked() {
    // if the audio is Playing and the button is clicked
    if ($("#playButton").html() === "Pause") {
        //pause the audio
        audio.pause();
        //change the html of the button to "Play"
        $("#playButton").html("Play");
    } //if the audio is Paused and the button is clicked
    else if ($("#playButton").html() === "Play") {
        //play the audio
        audio.play();
        //change the html of the button to "Pause"
        $("#playButton").html("Pause");
    }
}

//when the hints button is clicked 
$("#hintsButton").click(() => {
    alert(""+
    "Single click on a line to start syncing from it\n"+
    "Double click on a line to change its content\n"+
    "Click "+
    "Space/K: pause/play\n"+
    "J: -2s\nL: +2s\n"+
    "Arrow right: +5s\n"+
    "Arrow left: -5s\n"+
    "Shift: Sync Line"
    );
})

// SEEK FUNCTIONS ---
// Seeks by specifiec time
function seek(t) {
    audio.currentTime = audio.currentTime + t;
}
//-10s 
$("#backwardButton").click( function() {
    seek(-10);
});
//+10s
$("#forwardButton").click( function() {
    seek(+10);
});

//stores the id of the max line synced in order to keep track of where the user is up to
var maxLineSynced = 0;

///////////////
// Syncing Lines
///////////////

//says whether the line has been synced before
let hasLineBeenSyncedBefore = (lineId) => {
    //reads the timespamp inside the table and compares it to "0:00.00"
    let syncedBefore = ($("#tableTimeColumn"+lineId).html() != "0:00.00")
    return syncedBefore;
}

//when the sync button is clicked
$("#syncButton").click(() => {
    syncLine();
})

//when the user clicks the sync button or sync shortcut
function syncLine() {
    //if a timestamp preceding this one is greater, warn user and dont sync line
    if (isGreaterThanAllTimestampsBefore(selectedTableRow)) {
        // change the timespamp
        $("#tableTimeColumn"+selectedTableRow).html( formatTimeTommssms( audio.currentTime + getTimeOffset() ) );
        //adds the timestamp to timeStamps array
        timeStamps[selectedTableRow] = audio.currentTime + getTimeOffset();

        //sets maxSyncedLine to timeStamps.Length
        maxLineSynced = timeStamps.length;
        
        //resets the timestamp on every element after selectedTableRow
        resetAllTimestampsAfer(selectedTableRow);

        //we move to the next line so
        selectedTableRow++;

        //resets the table
        resetWholeTable();

        //formats the whole table
        formatTheWholeTable();

        //we want to finish editing any elements we were editing also so
        finishEditingElement();

        //scroll to keep the element in the center of the screen
        try {
            Element.prototype.documentOffsetTop = function () {
                return this.offsetTop + ( this.offsetParent ? this.offsetParent.documentOffsetTop() : 0 );
            };
            var top = document.getElementById("tableTimeColumn"+selectedTableRow).documentOffsetTop() - ( window.innerHeight / 2 );
            window.scrollTo( { top: top, behavior: 'smooth' });
        } catch (e) {
            console.log("window.scrollTo error\n\n" + e);
        }
    
    } else {
        displayWarning("A timestamp preceding the current one has a"+
        " greater timestamp than the current one, please either change that or "+
        "wait until the audio reaches a higher timestamp", 4000);
    }
}

//
function resetAllTimestampsAfer(rowId) {
    //console.log("reset timestamp elements starting at " + i);
    //get the timeStamo of rowId
    var initialTimestamp = timeStamps[rowId];
    //for all lines after lyricsLines[rowId]
    for (var i = rowId + 1; i < lyricsLines.length; i++) {
        //if the timestamp of the line being investigated is less than initialTimestamp reset that line
        if (timeStamps[i] < initialTimestamp) {
            //clears timeStamps after the selected element
            timeStamps[i] = null;
            $("#tableTimeColumn"+i).html("0:00.00"); 
            colorTableRowWhite(i);
            decolorTableRowBackgroundBlue(i);
        } else {
            //leave it alone
        }
    }
}

//checks if the current time is greater than all timestamps in timeStamps array
function isGreaterThanAllTimestampsBefore(lineId) {
    let currentTime = audio.currentTime + getTimeOffset();
    for (let i = 0; i < lineId; i++) {
        if (currentTime < timeStamps[i]) {
            return false;
        }
    }
    return true;
}

//resets the whole table color to white
function resetWholeTable() {
    //sets i to 0
    i = 0;
    //while the element exists
    while (j$("tableLyricsColumn"+i) != null) {
        colorTableRowWhite(i);
        decolorTableRowBackgroundBlue(i);
        i++;
    }
}

//We use this function to see whether the user is syncing lines or previewing the syncing they have done
let userSyncingLines = true;
function beginUserSyncingLinesIntrival() {
    setInterval(() => {
        //if the timestamp of the audio is greater than the gratest value in timestamps array
        //if (audio.currentTime ) {
        //    userSyncingLines = true;
        //    
        //} else if (audio.currentTime < timeStamps[maxLineSynced]) {
            highlitePreviewingLines();
            //userSyncingLines = false;
        //}
    }, 200)
}

function highlitePreviewingLines() {
    //if the length of the timeStamps array is less than 3 errors occure so dont do anything
    if (timeStamps.length <= 2) {
        //do nothing
    } //else  
    else {
        //format the table
        formatTheWholeTable();
        //stopWhileLoop = false
        let stopWhileLoop = false;
        //i starting from 0
        let i = 0;
        //greatest timeStamp met
        let greatestTimeStampMet = 0;
        //search for the lowest timeStamp which is less than the current
        //while stopWhileLoop isnt trigured and the searcher hasnt hit a timestamp less than the previous ones
        while (!stopWhileLoop) {
            if (timeStamps[i] > greatestTimeStampMet) {
                //change the greatest timeStamp met
                greatestTimeStampMet = timeStamps[i];
                //if the element we are looking for is found
                if (audio.currentTime <= timeStamps[i]) {
                    colorTableRowBackgroundBlue(i-1);
                    stopWhileLoop = true;
                }
            } else {
                stopWhileLoop = true;
                greatestTimeStampMet = 0;
            }
            
            i++;
        } 

        //the reason we look for the greatest timestamp met and reset it as soon as we hit one less is because
        //if we go from a 1, 2, 4, 6, 0, 0, 0, 9
        //we want it to stop after 6 because just like the real program it will run into an error 
    }
}

//formats the table
function formatTheWholeTable() {
    //sets i to 0
    i = 0;
    //while the element exists
    while (j$("tableLyricsColumn"+i) != null) {
        decolorTableRowBackgroundBlue(i);
        //if has been synced before color = red
        if (hasLineBeenSyncedBefore(i) == true) {
            colorTableRowRed(i);
        } //if i is the line the user is currently on then set it to blue
        else if (i == selectedTableRow) {
        } else if (hasLineBeenSyncedBefore(i) == false) {
            colorTableRowWhite(i);
        }
        i++;
    }
    colorTableRowBlue(selectedTableRow);
}


//Formats seconds into minutes:seconds:ms and returns it that way
function formatTimeTommssms(time) {
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

// Offsets the time as specified by the user
function getTimeOffset() {
    return -$("#cogPopupSelectTimeOffset").val()
}

//is displayWarning already displaying
let isDisplayWarningFree = true;
//Displays a warning message to the user
function displayWarning(message, time) {
    if (isDisplayWarningFree) {
        isDisplayWarningFree = false;
        j$("WarningBox").innerHTML = message;
        $("#WarningBox").css("opacity", "100");
        $("#WarningBox").css("z-index", "10000");
        setTimeout(() => {
            $("#WarningBox").css("opacity", "0");
            //wait until it is faded out before going to the back
                setTimeout(
                    () => {
                        $("#WarningBox").css("z-index", "-10000");
                        isDisplayWarningFree = true;
                    } 
                    ,1000
                );
            
        }, time);
    } else {
        console.log("Display Warning failed\nAlready displaying message");
    }
}

// Sets the time shown next to playbar when called
function setPlaybackTime(time) {
    $("#timeDisplay").html(time);
}

//sets the time stamp of the audio
var rangeBar = document.getElementById("audioPlaybackBar");

rangeBar.value = 0;


/*  When the user clicks on the playbar (to change the time) 
    we dont want to sync it to the music with the startPlaybarSync() interval 
    so we add 2 event listeners for mousedown and mouseup so that we dont sync
    the playbar when the user has mouse down on the playbar
*/
var playbackBarUpdateClearance = true; 
rangeBar.addEventListener("mousedown", () => {
    playbackBarUpdateClearance = false;
    console.log("playbackBarUpdateClearance revoked");
})
rangeBar.addEventListener("mouseup", () => {
    playbackBarUpdateClearance = true;
    //on mouseup it sets the time stamp to the chosen time
    audio.currentTime = rangeBar.value / 1000 * audio.duration;
})


//controls the audio with the audio slider
j$("volumeSlider").addEventListener("mousedown", (event) => {
    changeAudioIntrival = setInterval(() => {
        console.log("volumeSlider mousedown");
        audio.volume = j$("volumeSlider").value/50;
    }
, 50)})
//controls the audio with the audio slider
j$("volumeSlider").addEventListener("mouseup", (event) => {
    clearInterval(changeAudioIntrival);
})


//begins the intrival which syncs the playbar
function beginSyncingPlaybar() {
    setInterval(() => {
        if (playbackBarUpdateClearance == true) {
            // sets the playbar to the correct position
            let percentageProgress = (audio.currentTime/audio.duration)
            rangeBar.value = percentageProgress * 1000;
            //sets the time to the accurate time
            setPlaybackTime(formatTime(audio.currentTime));
        } else {
            setPlaybackTime(formatTime(rangeBar.value/1000*audio.duration));
        }
    }, 50)
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


// Converts given time (in seconds) to format "[mm:ss.ms]"
function convertTimeToLrcFileFormat(time) {
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

//if the user clicks generate file then triger finishItOff()
$("#GenerateFileButton").click(() => {
    //if either Song name or Album name field is empty then warn user and do nothing
    if ($("#topBarSongNameInput").val() == "") {
        displayWarning("Please enter the song name, the field is at the top left corner of the screen.", 4000);
        WarnUserToFillOutField("topBarSongNameInput");
    } if ($("#topBarArtistNameInput").val() == "") {
        displayWarning("Please enter the artist's name, the field is at the top left corner of the screen.", 4000);
        WarnUserToFillOutField("topBarArtistNameInput");
    } else {
        console.log("All required fields are met, \"finishItOff();\" triggered");
        finishItOff();
    }
})

function finishItOff() {
    finishEditingElement();
    var i = 0;
    let songName = $("#topBarSongNameInput").val();
    let artistName = $("#topBarArtistNameInput").val();
    let albumName = $("#topBarAlbumNameInput").val();
    let completed = "";
    completed += "[ar: " + artistName + "]\n";
    //if the album name field isnt empty then add it in
    if (albumName != "") {completed += "[al: " + albumName + "]\n";}
    completed += "[ti: " + songName + "]\n";
    completed += "[tool: github-DBKarman-Lyricsync]\n";
    completed += "[length: "+ convertTimeToLrcFileFormat(audio.duration) +"\n\n";
    while (i < lyricsLines.length) {
        //verifies time stamp, if timeStamps[i] == "NaN" returns 0, else returns timeStamps[i]
        completed += "["+convertTimeToLrcFileFormat(timeStampsVerify(timeStamps[i])) + " " + lyricsLines[i] + "\n" 
        i++;
        if (i == lyricsLines.length) {
            download((songName + ".lrc"), completed);
            break;
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

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();
    
    document.body.removeChild(element);
}


// KEY CONTROLS
$(document).keydown( function(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    
    if (editingWhatElement != -1) {
        return;
    }

    // if you want unicode code for any key, just un-comment this:
    console.log(unicode)
    // right arrow
    if (unicode == 39) {
        seek(+5);
    } 
    // left arrow
    else if (unicode == 37) {
        seek(-5);
    } 
    // J
    else if (unicode == 74) {
        seek(-2);
    }
    // L
    else if (unicode == 76) {
        seek(+2);
    }
    //Enter
    else if (unicode == 13) {
        finishEditingElement();
    }
    // Spacebar or K
    else if (unicode == 32 || unicode == 75) {
        //if the user isnt editing an element then enable spacebar
        if (editingWhatElement == -1) {
            playButtonCLicked()
        }
    } 
    //shift
    else if (unicode == 16) {
        //if the user isnt editing an element then enable shift key
        if (editingWhatElement == -1) {
            syncLine();
        }
    }
});

//warn user to fill out field
function WarnUserToFillOutField(id) {
    $('#' + id).css("transition", "background-color 0.2s ease-in");
    $('#' + id).css("background-color", "#ff0000");
    $('#' + id).css("border-radius", "0.2em");
    setTimeout(() => {
        $('#' + id).css("background-color", "inherit")
    }, 500);
}

//stops default behaviour for space bar scrolling down page
window.onkeydown = function(e) { 
    return !(e.keyCode == 32 && e.target == document.body);
}; 

//adds a new line between 2 lines
async function addNewLineAfterIndex(index) {
    //stops editing elemtns if the user is editing
    finishEditingElement();
    //saves edits made to arrays 
    saveEditsToArrays();
    //shifts all indexes in array to make space for new line
    shiftAllIndexesAfter(index, lyricsLines);
    //does the same to timeStamps
    shiftAllIndexesAfter(index, timeStamps);
    //clear the indexs we just added
    lyricsLines[index+1] = "";
    timeStamps[index+1] = 0;
    //shifts all lines after selected line down
    assignLyricsToLinesInTable_DontFetchLyricsFromFirstScreen();
    //reformats the table
    formatTheWholeTable();
    //start edit of new line 
    tableLineDblClicked(index+1);
}

//adds a new line between 2 lines
async function removeLineAtIndex(index) {
    //stops editing elemtns if the user is editing
    finishEditingElement();
    //saves edits made to arrays 
    saveEditsToArrays();
    //remove that index
    removeIndexAt(index, lyricsLines);
    //same for timeStamps
    removeIndexAt(index, timeStamps);
    //shifts all lines after selected line down
    assignLyricsToLinesInTable_DontFetchLyricsFromFirstScreen();
    //reformats the table
    formatTheWholeTable();
    tableLineClicked(selectedTableRow - 1);
}

//saves edits made to table
function saveEditsToArrays() {
    //get all lyrics and store it into lyrycsLines array to save editing
    for (let i = 0; i < lyricsLines.length; i++) {
        lyricsLines[i] = $("#tableLyricsColumn"+i).html();
    }
    //do same for timeStamps
    for (let i = 0; i < lyricsLines.length; i++) {
        timeStamps[i] = convertLRCtimeFormatToSeconds( $("#tableTimeColumn"+i).html() );
    }
}

//shifts all indexes after to +1 
function shiftAllIndexesAfter(index, array) {
    //create a temporary arrary
    tempArray = [];
    //add all indexes which need to be shifted to tempArray
    let j = 0;
    for (let i = (index + 1); i < array.length; i++) {
        tempArray[j] = array[i];
        j++;
    }

    //add those indexes back to tempArray
    j = index + 2;
    for (let i = 0; i < tempArray.length; i++) {
        array[j] = tempArray[i];
        j++;
    }
}

//shifts all indexes after to +1 
function removeIndexAt(index, array) {
    //create a temporary arrary
    tempArray = [];
    //add all indexes which need to be shifted to tempArray
    let j = 0;
    for (let i = (index + 1); i < array.length; i++) {
        tempArray[j] = array[i];
        j++;
    }

    //add those indexes back to array
    j = index;
    for (let i = 0; i < tempArray.length; i++) {
        array[j] = tempArray[i];
        j++;
    }

    //remove last index
    array.pop();
}

// Spits each item in array to a div and then assigns an id to them
function assignLyricsToLinesInTable_DontFetchLyricsFromFirstScreen() {
    // just a shortcut to access the lyricsTable which will store the lines
    let table = document.getElementById("lyricsTable");
    //clearts the innerHTML of the table
    table.innerHTML = "";

    //go through every element in lyricsLines and uses the tableLineSkeleton function to create valid html and insert it into the table
    for (i = 0; i < lyricsLines.length; i++) {
        table.innerHTML += tableLineSkeleton(i, lyricsLines[i], convertTimeToLrcFileFormat_WithoutSquareBracketOnEnd(timeStampsVerify(timeStamps[i])))
    }
}

//convert table format of time to time in milliseconds
function convertLRCtimeFormatToSeconds(time) {
    try {
        let minutes = time.split(":")[0];
        let seconds = time.split(":")[1].split(".")[0];
        let miliseconds = time.split(":")[1].split(".")[1];
        if (miliseconds.length > 3) {
            miliseconds = miliseconds.slice(0, 3);
        }
        
        let final = (
            parseFloat(minutes * 60) + 
            parseFloat(seconds) + 
            parseFloat(miliseconds * ( 1 / (10**miliseconds.length)))
            );
            return final;
    } catch (error) {
        console.log("error, time: " + time + ". error message: " + error)
        return 0;
    }
}

function convertTimeToLrcFileFormat_WithoutSquareBracketOnEnd(time) {
    var minutes, seconds, ms, formated; 
    minutes = Math.floor(time/60);
    seconds = Math.floor(time % 60);
    ms = ( time - Math.floor(time) ) * 100
    ms = Math.floor(ms)
    if (seconds.toString().length == 1) {
        seconds = "0" + seconds 
    }
    if (ms.toString().length == 1 ) {
        ms = "0" + ms 
    }
    formated = ""+minutes + ":" + seconds + "." + ms
    return(formated)
}

//DEVELOPER OPTIONS REMOVE WHEN FINISHED
//hide screen 1 and 3 and show screen 2
// whatScreenIsUserCurrentlyOn = 2;
// hideScreen1(); hideScreen3(); showScreen2();
// isTopBarButtonAccessible[1] = true;
// var testLyrics = "Hundred thousand for the chain and now my drop (Drop, drop)\nWhen I pull out the garage, I chop my top (Top, top)\nJust like a fiend, when I start I cannot stop (Wow)\nI got, I got hella guap, look at me now (At me now)\nOoh, covered in carats\nOoh, mahogany cabinets\nOoh, I ball like the Mavericks\nOoh, stable and stallions\nOoh, massive medallions\nOoh, I finally had it\nOoh, but then you just vanished\nDamn, I thought I was savage\nAll this stuntin' couldn't satisfy my soul (–oul)\nGot a hundred big places, but I'm still alone (–one)\nAyy, I would throw it all away\nI just keep on wishin' that the money made you stay\nYou ain't never cared about that bullshit anyway\nI just keep on wishin' that the money made you stay, ayy\nYou know I would throw it all away\nI just keep on wishin' that the money made you stay\nPrice went up, my price went up, we went our separate ways\nI just keep on wishin' that the money made you stay, ayy, ayy\nBuy me, love, try to buy me, love\nNow I'm alone, Ice Box, Omarion (Ooh)\nPlenty sluts grabbin' on my nuts (Woah!)\nMight have fucked, it was only lust Trust)\nI was livin' life, how could I have known? (Could have known)\nCouldn't listen to advise, 'cause I'm never wrong (Oh)\nIn the spotlight, but I'm on my own (Oh)\nNow that you're gone (Now that you're gone)\nAll this stuntin' couldn't satisfy my soul (–oul)\nGot a hundred big places, but I'm still alone (–one)\nAyy, I would throw it all away\nI just keep on wishin' that the money made you stay\nYou ain't never cared about that bullshit anyway\nI just keep on wishin' that the money made you stay, ayy\nYou know I would throw it all away\nI just keep on wishin' that the money made you stay\nPrice went up, my price went up, we went our separate ways\nI just keep on wishin' that the money made you stay, ayy, ayy\nI don't even wanna go home\nIn a big house all alone (Alone)\nI don't even wanna go home (No, no, no)\nBut I'ma try to call you on the phone\n(Brrt!)\nI would throw it all away\nI just keep on wishin' that the money made you stay\nYou ain't never cared about that bullshit anyway\nI just keep on wishin' that the money made you stay, ayy\nYou know I would throw it all away (All away)\nI just keep on wishin' that the money made you stay (Made you stay)\nPrice went up, my price went up\nWe went our separate ways (Separate ways)\nI just keep on wishin' that the money made you stay, ayy, ayy"
// topBarUploadFileButtonClicked();
////////////////////////////////////////////////////////

var developerTools = false;