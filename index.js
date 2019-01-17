const Word = require('./word');
const Inquirer = require('inquirer');

const dragonBallCharacters = [
    "goku", "gohan", "goten", "vegeta", "trunks", "piccolo", "krillin", "yamacha", "masterroshi", "bulma", "tienshinhan", "chichi", "kingkai", "frieza", "cell", "majinbuu", "captainginyu", "shenron", "misterpopo", "dende", "androideighteen", "doctorgero", "oxking"
];

let guessesLeft;
let chosenWords;
let word;
let chosenWord;

// Function for Startup Splash Screen//

function startScreen() {
    let = chosenWords = [];
    console.log(`  ====================
         =====       
        | * * |
        | * * |
         ===== 
    CHA-LA-HEAD-CHA-LA
Thank you for playing the Dragon Ball
    Word Guess Game!
  ====================`);
    playGame();
};

// Function for whenever a new round is started//

function startNewRound() {
    chosenWords = [];
    playGame();
};

//PlayGame function//

function playGame() {
    chosenWord = "";
    guessesLeft = 15;
    if (chosenWords.length < dragonBallCharacters.length) {
        chosenWord = chooseWord();
    } else {
        continueInq();
    }
    if (chosenWord) {
        word = new Word(chosenWord);
        word.createLetters();
        userGuess();
    }
}

// Choosing the new word from the word bank function//

function chooseWord() {
    let random = Math.floor(Math.random() * dragonBallCharacters.length);
    let newWord = dragonBallCharacters[random];
    if (chosenWords.indexOf(newWord) === -1) {
        chosenWords.push(newWord);
        return newWord;
    } else {
        return chooseWord();
    }
}

//Core function where all the guesses and checks happen//

function userGuess() {
    let checker = [];
    Inquirer.prompt([
        {
            name: "guessLetter",
            message: word.update() + `

Guess a letter!

Guesses Left: ${guessesLeft}

`
        }
    ]).then(data => {
        word.letters.forEach(letter => {
            letter.checkLetter(data.guessLetter);
            checker.push(letter.getLetter());
        });
        if (guessesLeft > 0 && checker.indexOf("_") !== -1) {
            guessesLeft--;
            if (guessesLeft === 0) {
                console.log(`NO More Guesses! The character was "${chosenWord}" Game Over :'(`);
                continueInq();
            } else {
                userGuess();
            }
        } else {
            console.log(`Nice Job you got the word!
"${chosenWord}`);
            continueInq();
        }
    });
}

//Continue prompt that comes up after each round//

function continueInq() {
    Inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: `
Would you like to play again? (Y/N)`,
            choices: ["Yes", "No"]
        }
    ]).then(data => {
        if (data.continue === "Yes") {
            startNewRound();
        } else {
            console.log(`

Thank you for playing!`);
        }
    });
}

startScreen();