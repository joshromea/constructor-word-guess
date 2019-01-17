class Letter {
    constructor(letter, guessedLetters) {
        this.letter = letter;
        this.guessedLetters = false;
    }
    getLetter() {
        if (!this.guessedLetters) {
            return "_";
        } else {
            return this.letter;
        }
    }
    checkLetter(guess) {
        if (guess === this.letter) {
            this.guessedLetters = true;
        }
    }
}

module.exports = Letter;