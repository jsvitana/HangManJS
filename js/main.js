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

    //Check if word is finished and win
    function checkWin(letterSpaces) { 
        var didWin = true;

        for(var i=0;i<letterSpaces.length;i++) {
            if($(letterSpaces[i]).text() == "_") {
                didWin = false;
            }
        }    

        if(didWin) {
            $(".keyboard").hide();
            $(".theWordLetter").css("color", "#00ff00");

            $(".theModal").css("margin-left", "225px");
            $(".theModal").css("margin-top", "350px");
            $(".theModal").css("background-color", "white");
            $(".content.win").show();
            $(".correctWordEnd").text(correctWord);
        }
    }

    $(".modalButton.setWord").click(function() {
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
        $(".content.start").hide();
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
        var didLose = false;

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

        //checks if hangman is hung
        updatedHangPic = $(".hide");
        if(updatedHangPic.length < 1) {
            $(".keyboard").hide();
            $(".theModal").css("margin-left", "225px");
            $(".theModal").css("margin-top", "350px");
            $(".theModal").css("background-color", "gray");
            $(".content.lose").show();
            $(".correctWordEnd").text(correctWord);
            fillInMissing();
            didLose = true;
        }

        if(!didLose) {
            checkWin(letterSpaces);
        }
    })

    $(".modalButton.playCPU").click(function() {
        var wordList = ["Democrat","doctor","everybody","floor","government","huge","kitchen","magazine","national","newspaper","official","organization","painting","performance","population","property","cow","pig","sheep","goat","javascript","alarm","clock","computer","keyboard","pillow","desk","horse","zebra","elephant","television","shelf","curtain","moonlight","vining","pepper","school","chocolate","milk","water","screen","hangman","sunlight","barn","pasture","tractor","kitchen","word","drywall","sheetrock","ceiling"];
        var randNum = Math.floor(Math.random() * wordList.length);

        correctWord = wordList[randNum];
        correctWord = correctWord.toUpperCase();

        //Bring back main game screen and shove away modal
        $("#gameBoard").css("background-color", "cornflowerblue");
        $(".content.start").hide();
        $(".theModal").css("margin-left", "700px");
        $(".keyboard").show();

        //Set the correct word to the chosen word
        createLetterSpaces();
    })
}) 


