/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, entire, predefinedScore, type;

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('final-score').placeholder = 'Final Score';
    console.log(document.getElementById('final-score').placeholder = 'Final Score')
}

init();

var lastDice1
var lastDice2


//Button Roll
document.querySelector('.btn-roll').addEventListener('click', function () {
    setScore()
    if (gamePlaying) {
        //1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        console.log("dice", dice1 + " " + dice2)

        //2. Display the result
        var diceDOM1 = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('#dice-2');

        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';

        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';


        //3.Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 && dice1 === 6 && dice2 !== 1 && dice2 === 6) {
            roundScore = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            document.querySelector('#current-' + activePlayer).textContent = "0";
            nextPlayer();
        }
        else if (dice1 !== 1 && dice1 !== 6 && dice2 !== 1 && dice2 !== 6) {
            //Add score
            roundScore = roundScore + dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            //Next player
            nextPlayer();
        }
        console.log("ro", roundScore)

        lastDice1 = dice1
        lastDice2 = dice2

    }
});

//Predefined score
function setScore() {
    predefinedScore = document.getElementById('final-score').value;
    document.getElementById('final-score').innerHTML = predefinedScore;
}

// Button Hold
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= predefinedScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            //Next player
            nextPlayer();
        }
    }
})

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

}

// Button New Game
document.querySelector('.btn-new').addEventListener('click', init)



// -----------------------
// document.querySelector('#current-' + activePlayer).textContent = dice;
// var x = document.querySelector("#score-0").textContent;
// console.log(x);
// document.querySelector('.dice').style.display = 'none';

