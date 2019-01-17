const letter = require(`./letter`);

class Word {
    constructor(word) {
        this.word = word;
        this.letters = [];
    }
    createLetters() {
        let wordArr = this.word.split('');
        for (let i = 0; i < wordArr.length; i++) {
            let newLetter = new letter(wordArr[i]);
            this.letters.push(newLetter);
        }
    }
    guess(guess) {
        this.letters.forEach(letter => {
            letter.checkLetter(guess);
        });
    }
    update() {
        let logWord = "";
        this.letters.forEach(letter => {
            logWord += letter.getLetter() + " ";
        });
        return logWord;
    }
}

module.exports = Word;