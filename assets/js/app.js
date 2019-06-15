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

// Question Card
function questionCard(question) {
    // Pieces
    const questionCard = $('<div class="question-card">');
    const questionField = $('<div class="question">').text(question.question);
    const optionsField = $('<div class="options">');
    const timerField = $('<div id="timer">');

    // Print the question
    //
    $('body').append(questionField);

    // Randomize order of answers
    shuffleAnswers(question.answers);

    // Print possible answers
    question.answers.forEach((option) => {
        const optionBtn = $(`<span class="option" value="${option.correct}">`)
            .text(option.option)
            .on('click', function() {
                console.log(this);
            });
        optionsField.append(optionBtn);
    });

    questionCard.append(questionField).append(optionsField);

    // Start timer
    questionCard.append(timerField.text(timer(30)));

    $('body').append(questionCard);
}

// Display Question
questionCard(randomQuestion());

// answer onClick
function answerCheck(guess) {
    if (guess.correct) {
        console.log(true);
    } else {
        console.log(false);
    }
}
// check if true
// incriment appropriately

function timer(start) {
    let timeLeft = start;

    setInterval(() => {
        if (!timeLeft <= 0) {
            timeLeft -= 1;
        }

        $('#timer').text(timeLeft);
    }, 1000);

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
