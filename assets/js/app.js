/* Variables */
const questions = [
    {
        question: 'Question One',
        answers: [
            {
                option: 'Option One',
                correct: true,
            },
            {
                option: 'Option Two',
                correct: false,
            },
            {
                option: 'Option Three',
                correct: false,
            },
            {
                option: 'Option Four',
                correct: false,
            },
        ],
        used: true,
    },
    {
        question: 'Question Two',
        answers: [
            {
                option: 'Option One',
                correct: true,
            },
            {
                option: 'Option Two',
                correct: false,
            },
            {
                option: 'Option Three',
                correct: false,
            },
            {
                option: 'Option Four',
                correct: false,
            },
        ],
        used: false,
    },
    {
        question: 'Question Three',
        answers: [
            {
                option: 'Option One',
                correct: true,
            },
            {
                option: 'Option Two',
                correct: false,
            },
            {
                option: 'Option Three',
                correct: false,
            },
            {
                option: 'Option Four',
                correct: false,
            },
        ],
        used: false,
    },
    {
        question: 'Question Four',
        answers: [
            {
                option: 'Option One',
                correct: true,
            },
            {
                option: 'Option Two',
                correct: false,
            },
            {
                option: 'Option Three',
                correct: false,
            },
            {
                option: 'Option Four',
                correct: false,
            },
        ],
        used: false,
    },
    {
        question: 'Question Five',
        answers: [
            {
                option: 'Option One',
                correct: true,
            },
            {
                option: 'Option Two',
                correct: false,
            },
            {
                option: 'Option Three',
                correct: false,
            },
            {
                option: 'Option Four',
                correct: false,
            },
        ],
        used: false,
    },
];

// Question Card
function nextQ() {
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

$('body').append(nextQ().question);

nextQ().answers.forEach((option) => {
    $('body')
        .append($('<br />'))
        .append(option.option);
});

// Display Question

// Display answers (in random order?)
// Start timer

// answer onClick
// check if true
// incriment appropriately

function r(max) {
    return Math.floor(Math.random() * max);
}
