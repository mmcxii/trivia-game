/* Variables */
const questions = [
    {
        question: 'Who is the player who caught the famous interception off of "The Tip"?',
        answers: [
            {
                option: 'Malcolm Smith',
                correct: true,
                fact: 'He also won the Super Bowl XLVIII MVP two weeks later.',
            },
            {
                option: 'Richard Sherman',
                correct: false,
            },
            {
                option: 'Bobby Wagner',
                correct: false,
            },
            {
                option: 'Earl Thomas III',
                correct: false,
            },
        ],
        used: false,
    },
    {
        question: 'What is the name of the Seahawks mascot?',
        answers: [
            {
                option: 'Blitz',
                correct: true,
                fact: 'seahawks.com lists Blitz\'s hobbies as "Reading, Fitness, and Birdwatching"',
            },
            {
                option: 'Tamia',
                correct: false,
            },
            {
                option: 'Thunder',
                correct: false,
            },
            {
                option: 'Blue',
                correct: false,
            },
        ],
        used: false,
    },
    {
        question: 'Who is the winningest Quarterback in Seahawks history?',
        answers: [
            {
                option: 'Russell Wilson',
                correct: true,
                fact:
                    'Russell Wilson has won 75 games in his 7 year career, passing Dave Kreig who won 70 games.',
            },
            {
                option: 'Matt Hasselbeck',
                correct: false,
            },
            {
                option: 'Dave Kreig',
                correct: false,
            },
            {
                option: 'Charlie Whithurst',
                correct: false,
            },
        ],
        used: false,
    },
    {
        question: 'Who was the first player the Seahawks traded for in franchise history?',
        answers: [
            {
                option: 'WR Steve Largent',
                correct: true,
                fact:
                    'The Oilers signed the undrafted Larget and traded him to Seattle for an 8th round pick in 1977. He went on to be inducted into the Hall of Fame',
            },
            {
                option: 'QB Matt Hasselbeck',
                correct: false,
            },
            {
                option: 'QB Dave Kreig',
                correct: false,
            },
            {
                option: 'RB Franco Harris',
                correct: false,
            },
        ],
        used: false,
    },
    {
        question: 'When were the Seahawks founded?',
        answers: [
            {
                option: '1976',
                correct: true,
                fact:
                    'The Seahawks were an expansion team in 1976, along with the Tampa Bay Buccaneers.',
            },
            {
                option: '1978',
                correct: false,
            },
            {
                option: '1970',
                correct: false,
            },
            {
                option: '1994',
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
let prevF;
let timedOut;
let userName;

/* Cards */

function welcomeCard() {
    const $welcomeCard = $('<div class="card">');
    const $getStartedBtn = $('<button class="btn btn-welcome">')
        .text(`Welcome to Seahawks Trivia, ${userName}! Please click here to get started.`)
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
    const $timerField = $('<div id="timer">').text(timer(30, 'timer'));
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
    const $scores = $('<div id="scores">');
    const $correct = $(`<span id="correct">`).text(correct);
    const $incorrect = $('<span id="incorrect">').text(incorrect);
    const $timedOut = $('<span id="timed-out">').text(timedOut);
    const $timer = $('<div id="nextq-timer">').text(timer(5, 'nextq-timer'));
    const $prevQ = $('<div id="prev-q">').text(prevQ);
    const $prevA = $('<div id="prev-a">').text(prevA);
    const $prevF = $('<div id="prev-f">').text(prevF);
    const $img = $(`<img class='prev-img' src='/assets/img/${slugify(prevA)}.png' />`);

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
        .append($timer)
        .append(
            $scores
                .append($correct)
                .append($incorrect)
                .append($timedOut)
        )
        .append($prevQ)
        .append($prevA)
        .append($prevF)
        .append($img);

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
    const $playAgainBtn = $('<button class="btn btn-loop">')
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

// Resets all questions to unanswered and starts game over
function playAgain() {
    for (let i = 0; i < questions.length; i++) {
        questions[i].used = false;
    }

    $('#app').empty();

    // Reset Variables
    correct = 0;
    incorrect = 0;
    timedOut = 0;

    questionCard(randomQuestion());
}

function init() {
    // Assign Variables
    correct = 0;
    incorrect = 0;
    timedOut = 0;

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

    // Store Question and Correct Answer for Answer Card
    prevQ = nextQ.question;

    for (let i = 0; i < nextQ.answers.length; i++) {
        if (nextQ.answers[i].correct) {
            prevA = nextQ.answers[i].option;
            prevF = nextQ.answers[i].fact;
        }
    }

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

// Remove spaces and lowercase
function slugify(answer) {
    return answer.replace(/\s+/g, '-').toLowerCase();
}

/* Main HTML Functions */

// Static Header
function renderHeader() {
    const $title = $('<h1 class="heading">').text('Seahawks Trivia');

    $('body').append($('<header>').append($title));
}

// Static App Field
function renderApp() {
    const $app = $('<section id="app">');

    $('body').append($('<main>').append($app));
}

// Static Footer
function renderFooter() {
    const $byLine = $('<div class="by-line">').text(`Nich Secord ©2019`);
    const $social = $('<div class="social">')
        .append(
            $(
                '<a class="social-link" href="https://www.github.com/mmcxii"><i class="fab fa-github"></i></a>'
            )
        )
        .append(
            $(
                '<a class="social-link" href="https://linkedin.com/in/mmcxii"><i class="fab fa-linkedin-in"></i></a>'
            )
        );

    $('body').append(
        $('<footer>')
            .append($byLine)
            .append($social)
    );
}

// Call Functions
$(document).ready(function() {
    // Render Static Components
    renderHeader();
    renderApp();
    renderFooter();

    userName = prompt('Please enter your name:');
    // Initialize the Game
    init();
});
