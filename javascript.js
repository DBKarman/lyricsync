//East access document.getElementById()
const j$ = (id) => {
    return document.getElementById(id);
};

//on page load trigger ResizeEvent();
addEventListener("load", (event) => {
    ResizeEvent();
});
//on window resize, trigger ResizeEvent();
addEventListener("resize", (event) => {
    ResizeEvent();
});
function ResizeEvent() {
    //Triggered when window loads or when resized


    //resize text area height
    $("#lyricsTextArea").css("height", window.innerHeight - 55 + "px");

    //resize topBarButtonsSpan width to window.InnterWidth - 170px
    $("#topBar").css("width", window.innerWidth - 10 + "px");

    //if window width is less than 580px
    if (window.innerWidth <= 580) {
        //the words cant fit anymore so change them to numbers
        j$("topBarEntryLyricsButton").innerHTML = "1";
        j$("topBarUploadFileButton").innerHTML = "2";
        j$("topBarSongInfoButton").innerHTML = "3";
        j$("topBarSyncLinesButton").innerHTML = "4";
    } else {
        j$("topBarEntryLyricsButton").innerHTML = "Enter Lyrics";
        j$("topBarUploadFileButton").innerHTML = "Upload File";
        j$("topBarSongInfoButton").innerHTML = "Song Info";
        j$("topBarSyncLinesButton").innerHTML = "Sync Lines";
    }

    //Changes width of the topBarButtonsSpan when they no longer fit
    if (window.innerWidth <= 768) {
        //(window.innerWidth - 10) / 4 - (padding + margin)
        $(".topBarButton").css(
            "width",
            $("#topBar").css("width").slice(0, -2) / 4 - 9 + "px"
        );
    } else {
        $(".topBarButton").css("width", "auto");
    }

    if (window.innerWidth <= 659) {
        $("#songInfoScreen").css("width", window.innerWidth - 20 + "px");
        $("#controlsConainer").css("width", window.innerWidth + "px");
        $("#syncButton").css("width", window.innerWidth);
        //$("#GenerateFileButton").css("width", window.innerWidth)
        $("#mainControls").css(
            "margin",
            "0 " + (window.innerWidth - 376) / 2 + "px"
        );
        //$("#mainControls").css("width", window.innerWidth + "px");
    } else {
        $("#songInfoScreen").css("width", "194px");
        $("#controlsConainer").css("width", "659px");
        $("#syncButton").css("width", "130px");
        //$("#GenerateFileButton").css("width", "130px")
        $("#mainControls").css("margin", "auto");
        //$("#mainControls").css("width", "390px");
    }
}

//sets placeholder for the big textarea on the first screen
$("#lyricsTextArea").attr(
    "placeholder",
    "Copy & paste lyrics into here\nYou can find lyrics from e.g. Musixmatch"
);

//checks whether the required things have been done before allowing access to other screens
//isTopBarButtonAccessible[0] = enterLyricsScreen, corresponding button: topBarEntryLyricsButton
//isTopBarButtonAccessible[1] = uploadFileScreen, corresponding button: topBarUploadFileButton
//isTopBarButtonAccessible[2] = songInfoScreen, corresponding button: topBarSongInfoButton
//isTopBarButtonAccessible[3] = syncLyricsScreen, corresponding button: topBarSyncLinesButton
let isTopBarButtonAccessible = [true, false, false, false];

//buts a line under the chosen topBar button to highlight youre on that screen
function highlightTopBarButton(dehighlightOrHighlight, buttonId) {
    //if the element with id buttonId does not exist
    if (!document.getElementById(buttonId)) {
        // trow error
        alert("Error thrown, check logs.");
        throw new Error(
            "Parameter buttonId has value" +
            buttonId +
            "\nof which a corresponding element with ID was not found."
        );
    }

    //bit of a *bad* system to highlight and dehighlight but this project is basically dead 
    //and rolls in the grave once every 6 months. so i cant be bothered fixing it :/
    if (dehighlightOrHighlight == "highlight") {
        $("#" + buttonId).css("border-bottom", "5px solid #2874ed");
        $("#" + buttonId).css("border-bottom-left-radius", "0em");
        $("#" + buttonId).css("border-bottom-right-radius", "0em");
    } else if (dehighlightOrHighlight == "dehighlight") {
        $("#" + buttonId).css("border-bottom", "0px solid #2874ed");
        $("#" + buttonId).css("border-bottom-left-radius", "0.5em");
        $("#" + buttonId).css("border-bottom-right-radius", "0.5em");
    } else {
        alert("Error thrown, check logs.");
        throw new Error(
            "Parameter dehighlightOrHighlight has value " +
            dehighlightOrHighlight +
            "\nof which is not a valid, only 'highlight' or 'dehighlight' are valid parameters."
        );
    }
}

//highlights the enterLyricsScreen button because thats the sreen the user is on at the start
highlightTopBarButton("highlight", "topBarEntryLyricsButton");

//just a tracker to keep track of what screen the user is on, set to 1 because thats the sreen the user is on at the start
let whatScreenIsUserCurrentlyOn = 1;

//if the user revisits the first tab then reset the synced lyrics
revisitedFirstTab = true;
//just incase the user wants to come back to screen 1
function topBarEntryLyricsButtonClicked() {
    revisitedFirstTab = true;

    // !!!RED!!! dehighlight all buttons
    redHighlightTopBarButton("dehighlight", "topBarEntryLyricsButton");
    redHighlightTopBarButton("dehighlight", "topBarUploadFileButton");
    redHighlightTopBarButton("dehighlight", "topBarSongInfoButton");
    redHighlightTopBarButton("dehighlight", "topBarSyncLinesButton");

    //dehighlight ALL BUTTONS
    highlightTopBarButton("dehighlight", "topBarEntryLyricsButton");
    highlightTopBarButton("dehighlight", "topBarUploadFileButton");
    highlightTopBarButton("dehighlight", "topBarSongInfoButton");
    highlightTopBarButton("dehighlight", "topBarSyncLinesButton");

    //highlight the button of the currently on screen
    highlightTopBarButton("highlight", "topBarEntryLyricsButton");

    //whatScreenIsUserCurrentlyOn = 1
    whatScreenIsUserCurrentlyOn = 1;

    //hide screen 1 and 2 and show screen 3
    showScreen1();
    hideScreen2();
    hideScreen3();
    hideScreen4();
}

//highlights the button in red so the user knows they can now click on it
function redHighlightTopBarButton(dehighlightOrHighlight, buttonId) {
    //if the element with id buttonId does not exist
    if (!document.getElementById(buttonId)) {
        // trow error
        alert("Error thrown, check logs.");
        throw new Error(
            "Parameter buttonId has value" +
            buttonId +
            "\nof which a corresponding element with ID was not found."
        );
    }

    if (dehighlightOrHighlight == "highlight") {
        $("#" + buttonId).css("background-color", "#930000");
    } else if (dehighlightOrHighlight == "dehighlight") {
        $("#" + buttonId).css("background-color", "inherit");
    } else {
        alert("Error thrown, check logs.");
        throw new Error(
            "Parameter dehighlightOrHighlight has value" +
            dehighlightOrHighlight +
            "\nof which a corresponding element with ID was not found."
        );
    }
}

//to only blip once
let blipped = false;
//when the user enters something into the text area grant them access to the 2nd screen and redHighlight it
j$("lyricsTextArea").addEventListener("input", (event) => {
    if (!blipped) {
        blip3Times("topBarUploadFileButton");
        //break fuse and stop blipping
        blipped = true;
    }
    isTopBarButtonAccessible[1] = true;
});

//warnUsrTheyCanClickButton
async function blip3Times(elementID) {
    redHighlightTopBarButton("highlight", elementID);
    await asyncReturnPromiseAfter(200);
    redHighlightTopBarButton("dehighlight", elementID);
    await asyncReturnPromiseAfter(200);
    redHighlightTopBarButton("highlight", elementID);
    await asyncReturnPromiseAfter(200);
    redHighlightTopBarButton("dehighlight", elementID);
    await asyncReturnPromiseAfter(200);
    redHighlightTopBarButton("highlight", elementID);
    return;
}

//Hides and displays time offset menu
$("#topBarSettings").click(function () {
    if ($("#topBarSettingsPopup").css("display") == "none") {
        $("#topBarSettingsPopup").css("display", "block");
    } else {
        $("#topBarSettingsPopup").css("display", "none");
    }
});
$("#cogPopupCloseX").click(function () {
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
    $("#songInfoScreen").css("display", "none");
}
//hides everything on the first screen
function hideScreen4() {
    $("#syncLyricsScreen").css("display", "none");
    $("#audioPlayerBar").css("display", "none");
}

function showScreen1() {
    $("#enterLyricsScreen").css("display", "block");
}
function showScreen2() {
    $("#uploadFileScreen").css("display", "block");
}
function showScreen3() {
    $("#songInfoScreen").css("display", "block");
}
function showScreen4() {
    $("#syncLyricsScreen").css("display", "block");
    $("#audioPlayerBar").css("display", "block");
}

function topBarUploadFileButtonClicked() {
    //check whether the user is allowed to click it
    if (
        isTopBarButtonAccessible[1] == true ||
        $("#lyricsTextArea").val().length > 0
    ) {
        //(red) dehighlight al buttons
        redHighlightTopBarButton("dehighlight", "topBarEntryLyricsButton");
        redHighlightTopBarButton("dehighlight", "topBarUploadFileButton");
        redHighlightTopBarButton("dehighlight", "topBarSongInfoButton");
        redHighlightTopBarButton("dehighlight", "topBarSyncLinesButton");

        //dehighlight ALL BUTTONS
        highlightTopBarButton("dehighlight", "topBarEntryLyricsButton");
        highlightTopBarButton("dehighlight", "topBarUploadFileButton");
        highlightTopBarButton("dehighlight", "topBarSongInfoButton");
        highlightTopBarButton("dehighlight", "topBarSyncLinesButton");

        //highlight the button of the currently on screen
        highlightTopBarButton("highlight", "topBarUploadFileButton");

        //whatScreenIsUserCurrentlyOn = current screen (1-4)
        whatScreenIsUserCurrentlyOn = 2;

        //hide screen 1 and 3 and show screen 2
        hideScreen1();
        showScreen2();
        hideScreen3();
        hideScreen4();
    }
}

//when the user clicks on the topBarUploadFileButton button,
$("#topBarUploadFileButton").click(() => {
    topBarUploadFileButtonClicked();
});

//gobal variable. used to warn user that JSMediaTags automatically read and autofilled the song name and artist name
let autofilled = false;
//when the user successfully uploads a file into the fileSelector
j$("fileSelector").addEventListener("change", (event) => {
    //loads the file from fileSelector to audioPlayback
    files = event.target.files;

    //JSMediaTags is used to read metadata from the file
    const jsmediatags = window.jsmediatags;
    //try to read metadata to retrieve artist name and song name
    console.log("triggered read metadata");
    jsmediatags.read(files[0], {
        onSuccess: function (tag) {
            console.log(tag);
            let songName = tag.tags.title;
            if (songName.length > 0 && $("#SongNameInput").val() == "") {
                $("#SongNameInput").val(songName);
                autofilled = true;
            }
            let artistName = tag.tags.artist;
            if (artistName.length > 0 && $("#ArtistNameInput").val() == "") {
                $("#ArtistNameInput").val(artistName);
                autofilled = true;
            }
            albumName = tag.tags.album;
            if (albumName.length > 0 && $("#AlbumNameInput").val() == "") {
                $("#AlbumNameInput").val(albumName);
                autofilled = true;
            }
        },
        onError: function (error) {
            console.error("JSMediaTag exception:");
            console.log(error);
        },
    });

    $("#audioPlaybackAudioSourceID").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audioPlayback").load();
    //changes the width of the fileSelector to allow space for the file name
    $("#fileSelector").css("width", "260px");
    //activate the third button
    blip3Times("topBarSongInfoButton");
    isTopBarButtonAccessible[2] = true;
});

//when the user clicks on the Song Info button,
j$("topBarSongInfoButton").addEventListener("click", (event) => {
    topBarSongInfoButtonClicked();
});

//Only trigger JSMediaTags autofill warning once. DOES NOT DISABLE JSMEDIATAGS
triggeredShowinbgOffJSMEdiaTags = false;
function topBarSongInfoButtonClicked() {
    //check whether the user is allowed to click it
    if (isTopBarButtonAccessible[2] == true) {
        // !!!RED!!! dehighlight all buttons
        redHighlightTopBarButton("dehighlight", "topBarEntryLyricsButton");
        redHighlightTopBarButton("dehighlight", "topBarUploadFileButton");
        redHighlightTopBarButton("dehighlight", "topBarSongInfoButton");
        redHighlightTopBarButton("dehighlight", "topBarSyncLinesButton");

        //dehighlight ALL BUTTONS
        highlightTopBarButton("dehighlight", "topBarEntryLyricsButton");
        highlightTopBarButton("dehighlight", "topBarUploadFileButton");
        highlightTopBarButton("dehighlight", "topBarSongInfoButton");
        highlightTopBarButton("dehighlight", "topBarSyncLinesButton");

        //highlight the button of the currently on screen
        highlightTopBarButton("highlight", "topBarSongInfoButton");

        //whatScreenIsUserCurrentlyOn = current screen (1-4)
        whatScreenIsUserCurrentlyOn = 3;

        hideScreen1();
        hideScreen2();
        showScreen3();
        hideScreen4();

        //alert the users that the firlsds have been automatically filled in ONLY ONCE
        if (autofilled == true && !triggeredShowinbgOffJSMEdiaTags) {
            triggeredShowinbgOffJSMEdiaTags = true;
            displayWarning(
                "Some fields have been automatically filled in by grabbing the song's metadata.",
                5500,
                "#1f6934",
                "white"
            );
        }

        //if the SyncLines tab requested the user to fill in a field then flash the
        if (blipNextTimeUserVisitsSongInformationTab[0] == true) {
            blipNextTimeUserVisitsSongInformationTab[0] = false;
            WarnUserToFillOutField("SongNameInput");
        }
        if (blipNextTimeUserVisitsSongInformationTab[1] == true) {
            blipNextTimeUserVisitsSongInformationTab[1] = false;
            WarnUserToFillOutField("ArtistNameInput");
        }
    }
}

//Checks if the required fields have been filled in
async function IsSongInfoEntered() {
    allInfoEntered = true;
    if ($("#SongNameInput").val() == "") {
        allInfoEntered = false;
    }
    if ($("#ArtistNameInput").val() == "") {
        allInfoEntered = false;
    }

    if (allInfoEntered == true) {
        isTopBarButtonAccessible[3] = true;
    }
}

previousLyricsEntered = "9832nfqrhgq39g33t$%£$%";
//run when the topBarSyncLinesButton button is clicked
function topBarSyncLinesButtonClicked() {
    IsSongInfoEntered();

    //check whether the user is allowed to click it
    if (isTopBarButtonAccessible[3] == true) {
        // !!!RED!!! dehighlight all buttons
        redHighlightTopBarButton("dehighlight", "topBarEntryLyricsButton");
        redHighlightTopBarButton("dehighlight", "topBarUploadFileButton");
        redHighlightTopBarButton("dehighlight", "topBarSongInfoButton");
        redHighlightTopBarButton("dehighlight", "topBarSyncLinesButton");

        //dehighlight ALL BUTTONS
        highlightTopBarButton("dehighlight", "topBarEntryLyricsButton");
        highlightTopBarButton("dehighlight", "topBarUploadFileButton");
        highlightTopBarButton("dehighlight", "topBarSongInfoButton");
        highlightTopBarButton("dehighlight", "topBarSyncLinesButton");

        //highlight the button of the currently on screen
        highlightTopBarButton("highlight", "topBarSyncLinesButton");

        //whatScreenIsUserCurrentlyOn = 4
        whatScreenIsUserCurrentlyOn = 4;

        //hide screen 1 and 2 and show screen 3
        hideScreen1();
        hideScreen2();
        hideScreen3();
        showScreen4();

        showHintsAfter();

        //do not reset the users progress unless he revisited the first tab and changed its contents
        if ($("#lyricsTextArea").val() != previousLyricsEntered) {
            previousLyricsEntered = $("#lyricsTextArea").val();

            assignLyricsToLinesInTable();
            //we want to start off with the first element so
            tableLineClicked(0);
        }
        //determines whether the user is syncing or previewing
        beginUserSyncingLinesIntrival();
        //begins syncing the playbar
        beginSyncingPlaybar();

        revisitedFirstTab = false;
    }
}

//when the user clicks on the topBarSyncLinesButton button,
$("#topBarSyncLinesButton").click(() => {
    console.log("Sync Lines Button Clicked");
    if (whatScreenIsUserCurrentlyOn != 4) {
        topBarSyncLinesButtonClicked();
    }
});

//hints at user to use shift
async function showHintsAfter() {
    await asyncReturnPromiseAfter(1500);
    displayWarning(
        "Hint: Press P/shift to sync lines\ninstead of clicking 'Sync' button",
        5500,
        "#1f6934",
        "white"
    );
}

//resolves promise after specified amount of time
function asyncReturnPromiseAfter(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

//screen 1 button clicked
$("#topBarEntryLyricsButton").click(() => {
    topBarEntryLyricsButtonClicked();
});

//takes unique id and lyrics as parameters and returns a finished line to insert into the table,
let tableLineSkeleton = (uniqueID, lyrics, timeStamp) => {
    let backgroundColor = uniqueID % 2;

    //add a class to each row of the table
    line =
        "<tr class='tableLine' " +
        //add a unique id to each row of the table
        "id='tableLineIndex" +
        uniqueID +
        "'>" +
        //Table Time Columns:
        //add an onclick event to each table columns which also passes its unique id to each function so we can know which item was clicked
        "<td <!--onclick='tableLineClicked(" +
        uniqueID +
        ")-->'" +
        //add a class of tableColumns and tableTimeColumns
        "class='tableColumns tableTimeColumns tableRowBackgroundColour" +
        backgroundColor +
        "' " +
        //add unique id to each time column
        "id='tableTimeColumn" +
        uniqueID +
        "'>" +
        timeStamp +
        "</td> " +
        //Edit Time Table Image
        "<td id='tableEditButtonColumn" +
        uniqueID +
        "' class='tableEditButtonColumnClass tableColumns tableRowBackgroundColour" +
        backgroundColor +
        "' onclick='tableLineDblClicked(" +
        uniqueID +
        ")'>" +
        "<img class='tableEditButtonImageClass' src='pen-icon.png' alt='' >" +
        "</td>" +
        //Add Time Table Image
        "<td id='tableAddButtonColumn" +
        uniqueID +
        "' class='tableEditButtonColumnClass tableColumns tableRowBackgroundColour" +
        backgroundColor +
        "' onclick='addNewLineAfterIndex(" +
        uniqueID +
        ")'>" +
        "<img class='tableEditButtonImageClass' src='add-icon.png' alt='' >" +
        "</td>" +
        //Remove Time Table Image
        //removeLineAtIndex
        "<td id='tableRemoveButtonColumn" +
        uniqueID +
        "' class='tableEditButtonColumnClass tableColumns tableRowBackgroundColour" +
        backgroundColor +
        "' onclick='removeLineAtIndex(" +
        uniqueID +
        ")'>" +
        "<img class='tableEditButtonImageClass' src='remove-icon.png' alt='' >" +
        "</td>" +
        //Table Lyrics Columns:
        //add an onclick event to each table columns which also passes its unique id to each function so we can know which item was clicked
        "<td onclick='tableLineClicked(" +
        uniqueID +
        ")' " +
        //add double click event listener
        " ondblclick='tableLineDblClicked(" +
        uniqueID +
        ")' " +
        //add a class of tableColumns and tableLyricsColumns and an alternating 1 or 0 for backgroundColor
        "class='tableColumns tableLyricsColumns tableRowBackgroundColour" +
        backgroundColor +
        "' " +
        //add unique id to each time column
        "id='tableLyricsColumn" +
        uniqueID +
        "'>" +
        //insert the lyrics into the tableLyricsColumn
        "" +
        lyrics +
        "</td>" +
        "</tr>";
    return line;
};

//holds the timespamps
let timeStamps = [];

//new array to store the lyrics lines
let lyricsLines = [];

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
        table.innerHTML += tableLineSkeleton(i, lyricsLines[i], "0:00.00");
        //console logs out when the for loop ends
        if (i == lyricsLines.length) {
            console.log("Emptied lyricsLines to table");
        }
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

let editingWhatElement = -1;
function tableLineDblClicked(rowId) {
    //just incase the user was editing another element we finish editing it
    finishEditingElement();
    //set editingWhatElement to rowIf
    editingWhatElement = rowId;
    //get the lyrics inside the line
    let lyricsInsideLine = j$("tableLyricsColumn" + rowId).innerHTML;
    //make an input type text with no intitial value because any value we set to it till mess up if theres any ' or " inside the value we give"
    let inputTypeText =
        "<input class='tableLyricsColumnInput' type='text' id='tableLyricsColumnInput" +
        rowId +
        "'>";
    //replace the value of the <td></td> with inputTypeText
    j$("tableLyricsColumn" + rowId).innerHTML = inputTypeText;
    //add the value now
    $("#tableLyricsColumnInput" + rowId).val(lyricsInsideLine);
}

//finishes editing the element after a double click
function finishEditingElement() {
    //if editingWhatElement is not -1 and the element with id tableLyricsColumnInput+editingWhatElement exists then continue
    if (
        editingWhatElement != -1 &&
        j$("tableLyricsColumnInput" + editingWhatElement) != null
    ) {
        //take the value of "tableLyricsColumnInput"+editingWhatElement and store it
        let tableLyricsColumnInputValue = j$(
            "tableLyricsColumnInput" + editingWhatElement
        ).value;
        //replace the contents of "tableLyricsColumn"+editingWhatElement with tableLyricsColumnInputValue
        j$("tableLyricsColumn" + editingWhatElement).innerHTML =
            tableLyricsColumnInputValue;
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
let selectedTableRow = 0;

//sets the colour of the row of which the table row the user is setting the time stamp to to BLUE
function colorTableRowBlue(rowId) {
    $("#tableTimeColumn" + rowId).css("color", "rgb(0, 174, 255)");
    $("#tableLyricsColumn" + rowId).css("color", "rgb(0, 174, 255)");
}

//sets the colour of the row of which the table row the user is setting the time stamp to to WHITE
function colorTableRowWhite(rowId) {
    $("#tableTimeColumn" + rowId).css("color", "#ffffff");
    $("#tableLyricsColumn" + rowId).css("color", "#ffffff");
}

//sets the colour of the row of which the table row the user is setting the time stamp to to RED
function colorTableRowRed(rowId) {
    $("#tableTimeColumn" + rowId).css("color", "#ff2626");
    $("#tableLyricsColumn" + rowId).css("color", "#ff2626");
}

function colorTableRowBackgroundBlue(rowId) {
    $("#tableTimeColumn" + rowId).css("background-color", "#074685");
    $("#tableLyricsColumn" + rowId).css("background-color", "#074685");
}

function decolorTableRowBackgroundBlue(rowId) {
    $("#tableTimeColumn" + rowId).css("background-color", "");
    $("#tableLyricsColumn" + rowId).css("background-color", "");
}

/////////////////////
//Audio stuff
/////////////////////
//shortcut variable, so we dont type document.getElementById("audioPlayback") every time we use it
let audio = document.getElementById("audioPlayback");

//when the play button is clicked
$("#playButton").click(() => {
    playButtonCLicked();
});

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
    alert(
        "" +
        "Single click on a line to start syncing from it\n" +
        "Double click on a line to change its content\n" +
        " \n" +
        "Space: pause/play\n" +
        "J: select next\nK: select prev\n" +
        "H: -2s\nL: +2s\n" +
        "Arrow right: +5s\n" +
        "Arrow left: -5s\n" +
        "P/Shift: Sync Line"
    );
});

// SEEK FUNCTIONS ---
// Seeks by specifiec time
function seek(t) {
    audio.currentTime = audio.currentTime + t;
}
//-10s
$("#backwardButton").click(function () {
    seek(-10);
});
//+10s
$("#forwardButton").click(function () {
    seek(+10);
});

// NAVIGATING FUNCTIONS ---
function jumpLine(relativeNumber) {
    tableLineClicked(
        Math.max(0, selectedTableRow + relativeNumber)
    )
}

//stores the id of the max line synced in order to keep track of where the user is up to
let maxLineSynced = 0;

///////////////
// Syncing Lines
///////////////

//says whether the line has been synced before
let hasLineBeenSyncedBefore = (lineId) => {
    //reads the timespamp inside the table and compares it to "0:00.00"
    let syncedBefore = $("#tableTimeColumn" + lineId).html() != "0:00.00";
    return syncedBefore;
};

//when the sync button is clicked
$("#syncButton").click(() => {
    syncLine();
});

//when the user clicks the sync button or sync shortcut
function syncLine() {
    //if a timestamp preceding this one is greater, warn user and dont sync line
    if (isGreaterThanAllTimestampsBefore(selectedTableRow)) {
        // change the timespamp
        $("#tableTimeColumn" + selectedTableRow).html(
            formatTimeTommssms(audio.currentTime + getTimeOffset())
        );
        //adds the timestamp to timeStamps array
        timeStamps[selectedTableRow] = timeStampsVerify(
            audio.currentTime + getTimeOffset()
        );

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
        scrollToTableElement(selectedTableRow)
    } else {
        displayWarning(
            "A timestamp preceding the current one has a" +
            " greater timestamp than the current one, please either change that or " +
            "wait until the audio reaches a higher timestamp",
            4000,
            "default",
            "default"
        );
    }
}

//Scrolls to a table element
function scrollToTableElement(tableRow) {
    try {
        Element.prototype.documentOffsetTop = function () {
            return (
                this.offsetTop +
                (this.offsetParent
                    ? this.offsetParent.documentOffsetTop()
                    : 0)
            );
        };
        let top =
            document
                .getElementById("tableTimeColumn" + tableRow)
                .documentOffsetTop() -
            window.innerHeight / 2;
        window.scrollTo({ top: top, behavior: "smooth" });
    } catch (e) {
        console.log("window.scrollTo error\n\n" + e);
    }
}

//resets all the timestamps after the selected element
function resetAllTimestampsAfer(rowId) {
    //console.log("reset timestamp elements starting at " + i);
    //get the timeStamo of rowId
    let initialTimestamp = timeStamps[rowId];
    //for all lines after lyricsLines[rowId]
    for (let i = rowId + 1; i < lyricsLines.length; i++) {
        //if the timestamp of the line being investigated is less than initialTimestamp reset that line
        if (timeStamps[i] < initialTimestamp) {
            //clears timeStamps after the selected element
            timeStamps[i] = null;
            $("#tableTimeColumn" + i).html("0:00.00");
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
    while (j$("tableLyricsColumn" + i) != null) {
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
        highlightPreviewingLines();
        //userSyncingLines = false;
        //}
    }, 200);
}

//Allows the user to preview the syncing they have done
function highlightPreviewingLines() {
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
                    colorTableRowBackgroundBlue(i - 1);
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
    while (j$("tableLyricsColumn" + i) != null) {
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
    let floored, minutes, seconds, ms, formated;

    // To not break the code
    if (time < 0) {
        time = 0;
    }

    floored = Math.floor(time);
    minutes = Math.floor(floored / 60);
    seconds = floored % 60;
    ms = (time - Math.floor(time)).toFixed(2);
    ms = ms * 100;

    minutes = Math.floor(minutes);
    seconds = Math.floor(seconds);
    ms = Math.floor(ms);

    // If the offset of time made it negative, makes it 0
    if (minutes < 0) {
        minutes = 0;
    }
    if (seconds < 0) {
        seconds = 0;
    }
    if (ms < 0) {
        ms = 0;
    }

    // if seconds or ms are 1 digit only, makes it 2 digit
    if (seconds.toString().length == 1) {
        seconds = "0" + seconds;
    }
    if (ms.toString().length == 1) {
        ms = ms + "0";
    }

    formated = minutes + ":" + seconds + "." + ms;
    return formated;
}

// Offsets the time as specified by the user
function getTimeOffset() {
    return -1 * document.getElementById("cogPopupSelectTimeOffset").value;
}

//is displayWarning already displaying
let isDisplayWarningFree = true;
//Displays a warning message to the user
async function displayWarning(message, time, backgroundColor, color) {
    if (isDisplayWarningFree) {
        isDisplayWarningFree = false;
        j$("WarningBox").innerHTML = message;
        //if default then default else backgroundColor
        if (backgroundColor == "default") {
            $("#WarningBox").css("background-color", "rgb(131, 13, 13)");
        } else {
            $("#WarningBox").css("background-color", backgroundColor);
        }
        //same for color
        if (color == "default") {
            $("#WarningBox").css("color", "#ffffff");
        } else {
            $("#WarningBox").css("color", color);
        }

        //make it visible
        $("#WarningBox").css("display", "block");
        $("#WarningBox").css("z-index", "10000");
        $("#WarningBox").css("opacity", "100");

        await asyncReturnPromiseAfter(time);

        $("#WarningBox").css("opacity", "0");

        //wait until it is faded out before changing display and zindex
        await asyncReturnPromiseAfter(200);

        $("#WarningBox").css("display", "none");
        $("#WarningBox").css("z-index", "-10000");
        isDisplayWarningFree = true;
    } else {
        console.log("Display Warning failed\nAlready displaying message");
    }
}

// Sets the time shown next to playbar when called
function setPlaybackTime(time) {
    $("#timeDisplay").html(time);
}

//sets the time stamp of the audio
let rangeBar = document.getElementById("audioPlaybackBar");

rangeBar.value = 0;

/*  When the user clicks on the playbar (to change the time) 
    we dont want to sync it to the music with the startPlaybarSync() interval 
    so we add 2 event listeners for mousedown and mouseup so that we dont sync
    the playbar when the user has mouse down on the playbar
*/
let playbackBarUpdateClearance = true;
rangeBar.addEventListener("mousedown", () => {
    playbackBarUpdateClearance = false;
    console.log("playbackBarUpdateClearance revoked");
});
rangeBar.addEventListener("mouseup", () => {
    //on mouseup it sets the time stamp to the chosen time
    audio.currentTime = (rangeBar.value / 1000) * audio.duration;
    playbackBarUpdateClearance = true;
});
rangeBar.addEventListener("touchstart", function () {
    playbackBarUpdateClearance = false;
    console.log("playbackBarUpdateClearance revoked (mobile)");
});
rangeBar.addEventListener("touchend", function () {
    audio.currentTime = (rangeBar.value / 1000) * audio.duration;
    playbackBarUpdateClearance = true;
    console.log("playbackBarUpdateClearance granted (mobile)");
});

//controls the audio with the audio slider
j$("volumeSlider").addEventListener("mousedown", (event) => {
    changeAudioIntrival = setInterval(() => {
        console.log("volumeSlider mousedown");
        audio.volume = j$("volumeSlider").value / 50;
    }, 50);
});
//controls the audio with the audio slider
j$("volumeSlider").addEventListener("mouseup", (event) => {
    clearInterval(changeAudioIntrival);
});

//begins the intrival which syncs the playbar
function beginSyncingPlaybar() {
    setInterval(() => {
        if (playbackBarUpdateClearance == true) {
            // sets the playbar to the correct position
            let percentageProgress = audio.currentTime / audio.duration;
            rangeBar.value = percentageProgress * 1000;
            //sets the time to the accurate time
            setPlaybackTime(formatTime(audio.currentTime));
        } else {
            setPlaybackTime(
                formatTime((rangeBar.value / 1000) * audio.duration)
            );
        }
    }, 50);
}

//Formats seconds into minutes:seconds and returns it that way
function formatTime(time) {
    let minutes, seconds, formated;
    time = Math.floor(time);
    minutes = Math.floor(time / 60);
    seconds = time % 60;
    if (seconds.toString().length == 1) {
        seconds = "0" + seconds;
    }
    formated = minutes + ":" + seconds;
    return formated;
}

// Converts given time (in seconds) to format "[mm:ss.ms]"
function convertTimeToLrcFileFormat(time) {
    let minutes, seconds, ms, formated;
    minutes = Math.floor(time / 60);
    seconds = Math.floor(time % 60);
    ms = (time - Math.floor(time)) * 100;
    ms = Math.floor(ms);
    // console.log(ms)
    if (seconds.toString().length == 1) {
        seconds = "0" + seconds;
    }
    if (minutes.toString().length == 1) {
        minutes = "0" + minutes;
    }
    if (ms.toString().length == 1) {
        ms = "0" + ms;
    }
    // console.log(ms)
    formated = "" + minutes + ":" + seconds + "." + ms;
    return formated;
}

//if the user clicks generate file then triger finishItOff()
$("#GenerateFileButton").click(() => {
    //if either Song name or Album name field is empty then warn user and do nothing
    if (allowedToFinishItOff()) {
        finishItOff();
    }
});

blipNextTimeUserVisitsSongInformationTab = [false, false];
//every if statement in this has to be skipped to return true
let allowedToFinishItOff = () => {
    state = true;
    if (!isTimeStampsValid()) {
        displayWarning(
            "Not all lines have been synced",
            5000,
            "default",
            "default"
        );
        console.log("state1: " + state);
        state = false;
    }
    if ($("#SongNameInput").val() == "") {
        displayWarning(
            'Please enter the song name, the field is located inside the "Song Information tab".',
            4000,
            "default",
            "default"
        );
        blipNextTimeUserVisitsSongInformationTab[0] = true;
        blip3Times("topBarSongInfoButton");
        console.log("state2: " + state);
        state = false;
    }
    if ($("#ArtistNameInput").val() == "") {
        displayWarning(
            'Please enter the artist\'s name, the field is located inside the "Song Information tab".',
            4000,
            "default",
            "default"
        );
        blipNextTimeUserVisitsSongInformationTab[1] = true;
        blip3Times("topBarSongInfoButton");
        console.log("state3: " + state);
        state = false;
    }

    console.log("state: " + state);
    return state;
};

let isTimeStampsValid = () => {
    //go through each timeStamp and verify that each timeStamp is greater than or equal to the one after
    let greatestTimeStamp = 0;
    //for each index avalible
    for (let i = 0; i < lyricsLines.length; i++) {
        //check if a corresponding index in timeStamps exists and that it is greater than the one before
        if (timeStampsVerify(timeStamps[i]) >= greatestTimeStamp) {
            greatestTimeStamp = timeStampsVerify(timeStamps[i]);
        } else {
            return false;
        }
    }
    return true;
};

function detectFirefoxMobile() {
    var userAgent = navigator.userAgent.toLowerCase();
    return /android.+firefox\//.test(userAgent);
}

function finishItOff() {
    //if user is on firefox mobile warn them to change the extension of the file
    if (detectFirefoxMobile()) {
        alert("We've detected that you're on Firefox Mobile. Firefox Mobile may automatically change .lrc extensions to .txt as an antivirus measure." +
            "\n\nPlease change the extension of the file to from .txt back to .lrc");
    }

    finishEditingElement();
    let i = 0;
    let songName = $("#SongNameInput").val();
    let artistName = $("#ArtistNameInput").val();
    let albumName = $("#AlbumNameInput").val();
    let completed = "";
    completed += "[ar: " + artistName + "]\n";
    //if the album name field isnt empty then add it in
    if (albumName != "") {
        completed += "[al: " + albumName + "]\n";
    }
    completed += "[ti: " + songName + "]\n";
    completed += "[tool: github-DBKarman-Lyricsync]\n";
    completed +=
        "[length: " + convertTimeToLrcFileFormat(audio.duration) + "]\n\n";
    while (i < lyricsLines.length) {
        //verifies time stamp, if timeStamps[i] == "NaN" returns 0, else returns timeStamps[i]
        completed +=
            "[" +
            convertTimeToLrcFileFormat(timeStampsVerify(timeStamps[i])) +
            "] " +
            lyricsLines[i] +
            "\n";
        i++;
        if (i == lyricsLines.length) {
            download(songName + ".lrc", completed);
            break;
        }
    }
}

// If an item in timeStamp[] is empty, it prints "NaN" to the .lrc file, this replaces it with 00:00.00
function timeStampsVerify(timeStamp) {
    if (timeStamp && timeStamp >= 0) {
        return timeStamp;
    } else {
        return 0;
    }
}

function download(filename, text) {
    let element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function anyKeyMatches(unicode, ...anyof) {
    return anyof.some((v) => {
        if (typeof v === "string") {
            return v.charCodeAt(0) == unicode
        } else {
            return v == unicode
        }
    })
}

const LEFT_ARROW = 37
const UP_ARROW = 38
const RIGHT_ARROW = 39
const DOWN_ARROW = 40
const SPACE = 32
const SHIFT = 16
// KEY CONTROLS
$(document).keydown(function (e) {
    let unicode = e.charCode ? e.charCode : e.keyCode;
    let is_editing = editingWhatElement != -1

    if (is_editing) {
        return;
    }

    let matchKey = (...keys) => { return anyKeyMatches(unicode, ...keys); }

    // if you want unicode code for any key, just un-comment this:
    console.log(unicode)
    // right arrow
    if (matchKey(RIGHT_ARROW)) {
        seek(+5);
    }
    // left arrow
    else if (matchKey(LEFT_ARROW)) {
        seek(-5);
    }
    else if (matchKey("H")) {
        seek(-2);
    }
    else if (matchKey("J") | matchKey(DOWN_ARROW)) {
        jumpLine(+1);
        //Scroll to the table line/element we went to
        scrollToTableElement(selectedTableRow)
    }
    else if (matchKey("K") | matchKey(UP_ARROW)) {
        jumpLine(-1);
        //Scroll to the table line/element we went to
        scrollToTableElement(selectedTableRow)
    }
    else if (matchKey("L")) {
        seek(+2);
    }
    //Enter
    else if (unicode == 13) {
        finishEditingElement();
    }
    // Spacebar
    else if (matchKey(SPACE)) {
        $("#playButton").click();
    }
    else if (matchKey("P", SHIFT) && !is_editing) {
        syncLine();
    }
});

//If user is on screen 4, the up and down arrows are used to go up and down the table lines,
//This disables the functionality of scrolling the page
document.addEventListener('keydown', function (event) {
    if (whatScreenIsUserCurrentlyOn === 4) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
        }
    }
});


//warn user to fill out field
async function WarnUserToFillOutField(id) {
    $("#" + id).css("transition", "background-color 0.2s ease-in");
    initialBackgroundColour = $("#" + id).css("background-color");
    $("#" + id).css("background-color", "#ff0000");
    await asyncReturnPromiseAfter(500);
    $("#" + id).css("background-color", initialBackgroundColour);
}

//stops default behaviour for space bar scrolling down page
window.onkeydown = function (e) {
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
    lyricsLines[index + 1] = "";
    timeStamps[index + 1] = 0;
    //shifts all lines after selected line down
    assignLyricsToLinesInTable_DontFetchLyricsFromFirstScreen();
    //reformats the table
    formatTheWholeTable();
    //start edit of new line
    tableLineDblClicked(index + 1);
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
        lyricsLines[i] = $("#tableLyricsColumn" + i).html();
    }
    //do same for timeStamps
    for (let i = 0; i < lyricsLines.length; i++) {
        timeStamps[i] = convertLRCtimeFormatToSeconds(
            $("#tableTimeColumn" + i).html()
        );
    }
}

//shifts all indexes after to +1
function shiftAllIndexesAfter(index, array) {
    //create a temporary arrary
    tempArray = [];
    //add all indexes which need to be shifted to tempArray
    let j = 0;
    for (let i = index + 1; i < array.length; i++) {
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
    for (let i = index + 1; i < array.length; i++) {
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
        table.innerHTML += tableLineSkeleton(
            i,
            lyricsLines[i],
            convertTimeToLrcFileFormat_WithoutSquareBracketOnEnd(
                timeStampsVerify(timeStamps[i])
            )
        );
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

        let final =
            parseFloat(minutes * 60) +
            parseFloat(seconds) +
            parseFloat(miliseconds * (1 / 10 ** miliseconds.length));
        return final;
    } catch (error) {
        console.log("error, time: " + time + ". error message: " + error);
        return 0;
    }
}

function convertTimeToLrcFileFormat_WithoutSquareBracketOnEnd(time) {
    let minutes, seconds, ms, formated;
    minutes = Math.floor(time / 60);
    seconds = Math.floor(time % 60);
    ms = (time - Math.floor(time)) * 100;
    ms = Math.floor(ms);
    if (seconds.toString().length == 1) {
        seconds = "0" + seconds;
    }
    if (ms.toString().length == 1) {
        ms = "0" + ms;
    }
    formated = "" + minutes + ":" + seconds + "." + ms;
    return formated;
}

let developerTools = false;
//DEVELOPER OPTIONS REMOVE WHEN FINISHED
////////////////////////////////////////////////////////
if (developerTools == true) {
    whatScreenIsUserCurrentlyOn = 3;
    isTopBarButtonAccessible[0] = true;
    isTopBarButtonAccessible[1] = true;
    isTopBarButtonAccessible[2] = true;
    isTopBarButtonAccessible[3] = false;
    // hideScreen1();
    // hideScreen2();
    // hideScreen3();
    // showScreen4();
    var testLyrics =
        "Hundred thousand for the chain and now my drop (Drop, drop)\nWhen I pull out the garage, I chop my top (Top, top)\nJust like a fiend, when I start I cannot stop (Wow)\nI got, I got hella guap, look at me now (At me now)\nOoh, covered in carats\nOoh, mahogany cabinets\nOoh, I ball like the Mavericks\nOoh, stable and stallions\nOoh, massive medallions\nOoh, I finally had it\nOoh, but then you just vanished\nDamn, I thought I was savage\nAll this stuntin' couldn't satisfy my soul (–oul)\nGot a hundred big places, but I'm still alone (–one)\nAyy, I would throw it all away\nI just keep on wishin' that the money made you stay\nYou ain't never cared about that bullshit anyway\nI just keep on wishin' that the money made you stay, ayy\nYou know I would throw it all away\nI just keep on wishin' that the money made you stay\nPrice went up, my price went up, we went our separate ways\nI just keep on wishin' that the money made you stay, ayy, ayy\nBuy me, love, try to buy me, love\nNow I'm alone, Ice Box, Omarion (Ooh)\nPlenty sluts grabbin' on my nuts (Woah!)\nMight have fucked, it was only lust Trust)\nI was livin' life, how could I have known? (Could have known)\nCouldn't listen to advise, 'cause I'm never wrong (Oh)\nIn the spotlight, but I'm on my own (Oh)\nNow that you're gone (Now that you're gone)\nAll this stuntin' couldn't satisfy my soul (–oul)\nGot a hundred big places, but I'm still alone (–one)\nAyy, I would throw it all away\nI just keep on wishin' that the money made you stay\nYou ain't never cared about that bullshit anyway\nI just keep on wishin' that the money made you stay, ayy\nYou know I would throw it all away\nI just keep on wishin' that the money made you stay\nPrice went up, my price went up, we went our separate ways\nI just keep on wishin' that the money made you stay, ayy, ayy\nI don't even wanna go home\nIn a big house all alone (Alone)\nI don't even wanna go home (No, no, no)\nBut I'ma try to call you on the phone\n(Brrt!)\nI would throw it all away\nI just keep on wishin' that the money made you stay\nYou ain't never cared about that bullshit anyway\nI just keep on wishin' that the money made you stay, ayy\nYou know I would throw it all away (All away)\nI just keep on wishin' that the money made you stay (Made you stay)\nPrice went up, my price went up\nWe went our separate ways (Separate ways)\nI just keep on wishin' that the money made you stay, ayy, ayy";
    $("#lyricsTextArea").val(testLyrics);
    topBarSongInfoButtonClicked();
    //$("#topBarSyncLinesButton").click();
}
