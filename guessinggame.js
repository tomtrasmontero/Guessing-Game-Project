$(document).ready(function() {

/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
 var playerGuess, winningNumber, guessesMade = [];



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random()*100+1);
}

// Fetch the Players Guess

function playersGuessSubmission(n){
	// add code here
	playerGuess = n;

	for(var i = 0; i < guessesMade.length;i++){
		if(guessesMade[i] === playerGuess){
			return $('.numberguessed').text("You've already guessed that number.  Guess again.");
		}
	}

	$('.input').val(0);
	guessesMade.push(playerGuess);
	$('.answer').text(playerGuess);
	$('.results').removeClass('hidden');
	$('.numberguessed').removeClass('hidden');
	checkGuess();

}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	var aproximate = Math.abs(winningNumber - playerGuess);
	var hint1 = "";
	var hint2 = "";

	if(playerGuess > winningNumber){
		hint1 = "higher";
	}else{
		hint1 = "lower";
	}

	if(aproximate > 10 && aproximate< 20){
		hint2 = "20";
	}else if(aproximate >0 && aproximate<=10){
		hint2 = "10";
	}else{
		hint2 = "not"
	}

	return "Your guess is " + hint1 + " and " + hint2 + " in range of the winning number"
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	var guessRemaining= $('.guessStatus').text((5 - (guessesMade.length) ) + " guess remaining.");

	if(playerGuess === winningNumber ){
		$('.numberguessed').text('Correct! You won!');
		$('.numberguessed').addClass("congrats");
		$('#buttons').addClass("hidden");
		$('.results').addClass("hidden");
		$('.Replay').removeClass("hidden");
		guessRemaining;
	
	}else if(playerGuess !== winningNumber && guessesMade.length === 5){
		$('.numberguessed').text('You Lose!');
		$('.Replay').removeClass("hidden");
		$('#buttons').addClass("hidden");
		guessRemaining;

	}else{  
		$('.numberguessed').text('Try Again');
		guessRemaining;
		$('.hintStatus').text(lowerOrHigher());
	}

}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	var userHint = "";

	if(winningNumber % 2 === 0){
		userHint = "The number is even";
	}else{
		userHint = "The number is odd";
	}

	return userHint
}

// Allow the "Player" to Play Again

function playAgain(){
	winningNumber = generateWinningNumber();
	alert(winningNumber);
	guessesMade = [];
	$('.results').addClass('hidden');
	$('.Replay').addClass('hidden');
	$('#buttons').removeClass('hidden');
	$('.numberguessed').removeClass("congrats");
	$('.results').addClass('hidden');
	$('.numberguessed').addClass('hidden');
}


/* **** Event Listeners/Handlers ****  */
winningNumber = generateWinningNumber();



$('.submitguess').on('click', function(){
	$('.results').removeClass("hidden");
	playersGuessSubmission(+$('.input').val());
});

$('.Hint').on('click', function(){
	alert(provideHint());
});

$('.Replay').on('click', function(){
	playAgain();
});

$(document).keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13' && guessesMade.length < 5){
		$('.results').removeClass("hidden");
		playersGuessSubmission(+$('.input').val());	
	}
});


});