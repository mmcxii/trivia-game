/* Variables */
const questions = [
    {
        question: 'Question One',
        answers: [
            {
                option: 'Q1: Option One',
                correct: true,
            },
            {
                option: 'Q1: Option Two',
                correct: false,
            },
            {
                option: 'Q1: Option Three',
                correct: false,
            },
            {
                option: 'Q1: Option Four',
                correct: false,
            },
        ],
        used: false,
    },
    {
        question: 'Question Two',
        answers: [
            {
                option: 'Q2: Option One',
                correct: true,
            },
            {
                option: 'Q2: Option Two',
                correct: false,
            },
            {
                option: 'Q2: Option Three',
                correct: false,
            },
            {
                option: 'Q2: Option Four',
                correct: false,
            },
        ],
        used: false,
    },
    {
        question: 'Question Three',
        answers: [
            {
                option: 'Q3: Option One',
                correct: true,
            },
            {
                option: 'Q3: Option Two',
                correct: false,
            },
            {
                option: 'Q3: Option Three',
                correct: false,
            },
            {
                option: 'Q3: Option Four',
                correct: false,
            },
        ],
        used: false,
    },
    {
        question: 'Question Four',
        answers: [
            {
                option: 'Q4: Option One',
                correct: true,
            },
            {
                option: 'Q4: Option Two',
                correct: false,
            },
            {
                option: 'Q4: Option Three',
                correct: false,
            },
            {
                option: 'Q4: Option Four',
                correct: false,
            },
        ],
        used: false,
    },
    {
        question: 'Question Five',
        answers: [
            {
                option: 'Q5: Option One',
                correct: true,
            },
            {
                option: 'Q5: Option Two',
                correct: false,
            },
            {
                option: 'Q5: Option Three',
                correct: false,
            },
            {
                option: 'Q5: Option Four',
                correct: false,
            },
        ],
        used: false,
    },
];

let correct;
let incorrect;
let prevQ;
let prevA;
let timedOut;
let userName;

/* Cards */

function welcomeCard() {
    const $welcomeCard = $('<div class="card">');
    const $getStartedBtn = $('<button class="btn">')
        .text(`Welcome, ${userName}. Please click here to get started`)
        .on('click', function() {
            // Begin game and display first question
            questionCard(randomQuestion());
        });

    $welcomeCard.append($getStartedBtn);

    $('#app').append($welcomeCard);
}

// Question Card
function questionCard(question) {
    // Pieces
    const $questionCard = $('<div class="card">');
    const $questionField = $('<div id="question">').text(question.question);
    const $timerField = $('<div id="timer">').text(timer(5, 'timer')); // Set timer to 30 seconds
    const $optionsField = $('<div id="options">').on('click', '.option', function() {
        answerCard(answerCheck(this));
    });

    // Randomize order of answers
    shuffleAnswers(question.answers);

    // Print possible answers
    question.answers.forEach((option) => {
        const $optionBtn = $(`<button class="btn option" value="${option.correct}">`).text(
            option.option
        );

        $optionsField.append($optionBtn);
    });

    // Build card
    $questionCard
        .append($questionField)
        .append($timerField)
        .append($optionsField);

    // Remove previous card and replace with answer card
    $('#app')
        .empty()
        .append($questionCard);
}

function answerCard(ans) {
    // Pieces
    const $answerCard = $('<div class="card">');
    const $message = $('<div id="message">');
    const $correct = $(`<span id="correct">`).text(`Correct: ${correct}`);
    const $incorrect = $('<span id="incorrect">').text(`Incorrect: ${incorrect}`);
    const $timedOut = $('<span id="timed-out">').text(`Timed Out: ${timedOut}`);
    const $timer = $('<div id="nextq-timer">').text(timer(5, 'nextq-timer'));
    const $prevQ = $('<div id="prev-q">').text(prevQ);
    const $prevA = $('<div id="prev-a">').text(prevA);

    switch (ans) {
        case 0:
            $message.text(`Nice job, ${userName}!`);
            break;

        case 1:
            $message.text(`Hah! ${userName} you clown!`);
            break;

        case 2:
            $message.text(`${userName}, you know you have to actually answer the question, right?`);
            break;
    }

    // Build Card
    $answerCard
        .append($message)
        .append($prevQ)
        .append($prevA)
        .append($timer)
        .append($correct)
        .append($incorrect)
        .append($timedOut);

    // Remove previous card and replace with answer card
    $('#app')
        .empty()
        .append($answerCard);
}

function finalCard() {
    const $finalCard = $('<div class="card">');
    const $stats = $('<div id="stats">').text(
        `Your final score was ${correct} out of ${questions.length}.`
    );
    const $playAgainBtn = $('<button class="btn">')
        .text("Give 'r another go?")
        .on('click', function() {
            playAgain();
        });

    if (timedOut !== 0) {
        $stats.append(
            $('<span>').text(
                ` Additionally, you let ${timedOut} ${
                    timedOut === 1 ? 'question' : 'questions'
                } go unanswered.`
            )
        );
    }

    // Build Card
    $finalCard.append($stats).append($playAgainBtn);

    // Remove previous card and replace with answer card
    $('#app')
        .empty()
        .append($finalCard);
}

/* Primary Functions */

function answerCheck(guess) {
    // Convert input to jQuery object
    const $guess = $(guess);

    // Store information about previous question
    prevQ = $('#question').text();
    prevA = $guess.text();

    // Check if the question was answered
    if ($guess.text() === '') {
        timedOut++;
        return 2;
    }

    for (let i = 0; i < questions.length; i++) {
        // Find the active question
        if (questions[i].question === $('#question').text()) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                // Find the chosen guess
                if (questions[i].answers[j].option === $guess.text()) {
                    // Check and mark if the guess is correct or incorrect
                    if (questions[i].answers[j].correct) {
                        correct++;
                        return 0;
                    } else {
                        incorrect++;
                        return 1;
                    }
                }
            }
        }
    }
}

function playAgain() {
    for (let i = 0; i < questions.length; i++) {
        questions[i].used = false;
    }

    $('#app').empty();
    init();
}

function init() {
    // Assign Variables
    correct = 0;
    incorrect = 0;
    timedOut = 0;

    // userName = prompt('Please enter your name:');
    //
    userName = 'Nich';
    welcomeCard();
}

/* Helper Functions */

// Selects a random unused question
function randomQuestion() {
    // Select a question at random
    let nextQ = questions[r(questions.length)];

    // Repeat until an unused question is selected
    while (nextQ.used) {
        nextQ = questions[r(questions.length)];
    }

    // Mark the answer as used
    nextQ.used = true;

    return nextQ;
}

// Counts down time remaining
function timer(start, location) {
    // Set the length of the timer
    let timeLeft = start;

    const countDown = setInterval(function() {
        // Decriment
        timeLeft--;

        // Stop the timer at 0
        if (timeLeft === 0) {
            clearInterval(countDown);

            // Load the next page based on the current page
            switch (location) {
                case 'timer':
                    // Load the answer page
                    answerCard(answerCheck());
                    break;

                case 'nextq-timer':
                    // If all questions are answered, end the game
                    if (correct + incorrect + timedOut === questions.length) {
                        finalCard();
                        // Otherwise load the next question
                    } else {
                        questionCard(randomQuestion());
                    }
                    break;
            }
        }

        // Stop timer when button is clicked
        $('.btn').on('click', function() {
            clearInterval(countDown);
        });

        // Update html in specified location
        $(`#${location}`).text(timeLeft);

        // Delay 1 second
    }, 1000);

    // Populates with initial value
    return timeLeft;
}

// Generates random number within a range
function r(max) {
    return Math.floor(Math.random() * max);
}

// Randomizes order of answers
function shuffleAnswers(options) {
    options.sort(() => Math.random() - 0.5);
}

/* Main HTML Functions */
function renderHeader() {
    const $title = $('<h1 class="heading">').text('Trivia Game');

    $('body').append($('<header>').append($title));
}

function renderApp() {
    const $app = $('<section id="app">');

    $('body').append($('<main>').append($app));
}

function renderFooter() {
    const $byLine = $('<div class="by-line">').text(`Nich Secord ©2019`);

    $('body').append($('<footer>').append($byLine));
}

// Call Functions
$(document).ready(function() {
    // Render Static Components
    renderHeader();
    renderApp();
    renderFooter();

    // Initialize the Game
    init();
});
