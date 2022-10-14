'use strict';

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("option-text"));

const questionCounterText = document.getElementById("progressText");
const pointText = document.getElementById("point");

// progress bar
const progressFull = document.getElementById("progressFull");
// 
let currentQuestion = {};
let acceptingAnswers = false;
let point = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: 'How can you attempt to access the property `a.b` on `obj` without throwing an error if a is undefined? let obj = {};',
        choice1: 'obj?.a.b',
        choice2: 'obj.a?.b',
        choice3: 'obj[a][b]',
        choice4: 'obj.?a.?b',
        answer: 2,
    },
    {
        question:
            `What happens when you run this code?
            if (true) { var x = 5;
            const y = 6;
            let z = 7; }
            console.log(x + y + z);`
        ,
        choice1: "It will throw a ReferenceError about x",
        choice2: "It will print 18",
        choice3: "It will print undefined",
        choice4: "It will throw a ReferenceError about y",
        answer: 4,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];


// point
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

const startQuiz = () => {
    questionCounter = 0;
    point = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

const getNewQuestion = () => {
    // For ending the quiz when quiz is end
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {

        // for local storage
        localStorage.setItem("RecentPoint", point);
        //
        return window.location.assign('/complete.html');
    }
    //
    questionCounter++;

    // for question display 
    questionCounterText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
    //

    // Update progress bar by using styles and questioncounter
    progressFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    //

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const option = choice.dataset['option'];
        choice.innerText = currentQuestion['choice' + option];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((option) => {
    option.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['option'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ?
                "right" : "wrong";
        
           // For adding point
            if (classToApply === 'right') {
                incrementScore(CORRECT_BONUS) 
            }
    
        // for adding css to option selected either right or wrong
        selectedChoice.parentElement.classList.add(classToApply);
       
        // to set time to wait for a while before moving to next question 
        setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
        }, 1000);

        console.log(selectedAnswer==currentQuestion.answer)
    });
});

// for point incremental the point
const incrementScore = num => {
  point += num;
  pointText.innerText = point;
};


startQuiz()


   // const classToApply = "incorrect";
        // if (selectedAnswer == currentQuestion.answer) {
        //     classToApply = "correct"
        // };