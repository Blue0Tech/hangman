$(document).ready(function() {
    getWord();
});

function getWord() {
    $.ajax({
        url: '/get-template',
        type: 'get',
        success: function(result) {
            fillBlanks(result.word);
        },
        error: function(result) {
            alert(result.responseJSON.message);
        }
    });
};

function fillBlanks(randomWord) {
    let gameOver = false;

    $('#blanks').empty();

    for(var i=0;i<randomWord.inputs;i++) {
        $('#blanks').append(`<span class='fill_blanks' id='input_${i}'>_</span>`);
    }

    $('#hint').html(randomWord.category);

    $('.clickable').click(function() {
        let correctGuess = false;
        let id = $(this).attr('id');
        let life = parseInt($('#life').text());

        for(var i=0;i<randomWord.inputs;i++) {
            let ansChar = randomWord.word.charAt(i).toLowerCase();
            if(ansChar == id) {
                if(life > 0 && ($('.fill_blanks').eq(i).html() == '_' || $('.fill_blanks').eq(i).html() == id)) {
                    $('.fill_blanks').eq(i).html(id);
                    $(this).addClass('green');
                    correctGuess = true;
                    if($('#blanks').text() == randomWord.word.toLowerCase()) {
                        $('#result').text("Correct word! You win!");
                        gameOver = true;
                    };
                };
            };
        };

        if(life > 0 && correctGuess != true && gameOver != true) {
            life-=1;
            $('#life').text(life);
            $(this).addClass('red');
        };
        if(life == 0) {
            $('#result').text(`You lost! Better luck next time! The word was ${randomWord.word}.`);
        };
    });
};