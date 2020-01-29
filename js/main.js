$(document).ready(function() {
    var correctWord = "";

    //Defaults to make background look like its unusable while modal is there
    $("#gameBoard").css("background-color", "gray");
    $(".keyboard").hide();

    //Creates the spaces for the correct word
    function createLetterSpaces() {
        var amountOfLetters = correctWord.length;

        for(var i=0;i<amountOfLetters;i++) {
            $(".theWord").append("<span class='theWordLetter'>_</span>");
        }
    }

    //Fills in missing letters after game is over
    function fillInMissing() {
        var letterSpaces = $(".theWordLetter");

        for(var i=0;i<correctWord.length;i++) {
            $(letterSpaces[i]).text(correctWord[i]).css("color", "red");
        }
    }

    $(".modalButton").click(function() {
        //Check if word is valid
        correctWord = $(".correctWord").val();
        correctWord = correctWord.toUpperCase();
        if((correctWord.length > 10) || (correctWord.length < 1)) {
            alert("Please Enter a valid word containing letters A-Z, at the most 10 characters long");
            return;
        }
        for(var i=0;i<correctWord.length;i++) {
            if((correctWord.charCodeAt(0) < 65) || (correctWord.charCodeAt(0) > 90)) {
                alert("Please Enter a valid word containing letters A-Z, at the most 10 characters long");
                return;
            }
        }

        //Bring back main game screen and shove away modal
        $("#gameBoard").css("background-color", "cornflowerblue");
        $(".theModal").css("margin-left", "700px");
        $(".keyboard").show();

        //Set the correct word to the chosen word
        createLetterSpaces();
    })
    
    $(".key").click(function() {
        var hangPic = $(".hide");
        var updatedHangPic;
        var keyValue = $(this).text();
        var letterSpaces = $(".theWordLetter");
        var isCorrectLetter = false;

        //turns off ability to click element 
        $(this).off("click");

        //Finds and enters letter if part of correct word
        for(var i=0;i<correctWord.length;i++) {
            if(correctWord[i] == keyValue) {
                $(letterSpaces[i]).text(keyValue);
                isCorrectLetter = true;
            }
        }

        //Appends the value in the used section
        $(".usedCharactersLetters").append(" " + keyValue);

        //Update Keys
        $(this).removeClass("unused").addClass("used");

        //Updates Pic if not correct letter
        if(!isCorrectLetter) {
            $(hangPic[0]).removeClass("hide").addClass("show");
        }

        //Checks if word is filled in
        

        //checks if hangman is hung
        updatedHangPic = $(".hide");
        if(updatedHangPic.length < 1) {
            alert("You lost! The correct word was: " + correctWord);
            $(".keyboard").hide();
            fillInMissing();
        }
    })

}) 


