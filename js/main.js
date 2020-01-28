$(document).ready(function() {
    var correctWord = "HANGMAN";

    //Creates the spaces for the correct word
    function createLetterSpaces() {
        var amountOfLetters = correctWord.length;

        for(var i=0;i<amountOfLetters;i++) {
            $(".theWord").append("<span class='theWordLetter'>_</span>");
        }
    }

    createLetterSpaces();
    
    $(".key").click(function() {
        var hangPic = $(".hide");
        var keyValue = $(this).text();
        var letterSpaces = $(".theWordLetter");

        //turns off ability to click element 
        $(this).off("click");

        //Update Keys and Picture
        $(this).removeClass("unused").addClass("used");
        $(hangPic[0]).removeClass("hide").addClass("show");
        
        //Appends the value in the used section
        $(".usedCharactersLetters").append(" " + keyValue);

        //Finds and enters letter if part of correct word
        for(var i=0;i<correctWord.length;i++) {
            if(correctWord[i] == keyValue) {
                $(letterSpaces[i]).text(keyValue);
            }
        }
    })

}) 


