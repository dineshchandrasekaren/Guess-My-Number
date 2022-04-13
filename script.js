'use strict';
let highScore = document.querySelector('.highscore');
const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const resetButton = document.querySelector('.reset');

let secretNumber = generateNumber();
let score = 20;

// Initial load 
highScore.textContent = localStorage.getItem("highscore");

// generate New Number
function generateNumber() { return Math.trunc(Math.random() * 20) + 1; }

// To display the number after win
function displayNumber(number) { document.querySelector('.number').textContent = number; }

// To reset all
function reset() {
    secretNumber = generateNumber();
    displayNumber('?');
    checkButton.disabled = false;
    score = 20;
    displayMessage('Start guessing...');
    document.querySelector('.guess').value = '';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('body').style.backgroundColor = '#333';
    displayScore(score);
}

// To display message
function displayMessage(message) { document.querySelector('.message').textContent = message; }

// To display score
function displayScore(score) { document.querySelector('.score').textContent = score; }

// Reset Button
resetButton.addEventListener('click', () => {
    localStorage.setItem("highscore", 0);
    highScore.textContent = localStorage.getItem("highscore");
    reset();
})



// Again Button
againButton.addEventListener('click', () => { reset(); });

// Check Button
checkButton.addEventListener('click', () => {
    const guess = Number(document.querySelector('.guess').value);

    // When no number
    if (!guess) {
        displayMessage('Please Enter the Guess🤔 Number');

        // When guess is wrong
    } else if (guess !== secretNumber) {
        if (score >= 1) {
            displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
            score--;
            displayScore(score);
        } else {
            displayMessage('Game Over💀 click again button to reset');
            checkButton.disabled = true;
        }

        // When player win
    } else if (guess === secretNumber) {
        if (score > Number(highScore.textContent)) {
            localStorage.setItem("highscore", score);
            highScore.textContent = localStorage.getItem("highscore");
        }
        displayMessage('🔥 Correct Number  click again button to play again');
        checkButton.disabled = true;
        displayNumber(secretNumber);
        document.querySelector('.number').style.width = '18rem';
        document.querySelector('body').style.backgroundColor = '#60b347';
    }
});

