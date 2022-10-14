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

let questions = [];

fetch(
     'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
)
    .then((res) => {
        return res.json();
    })
    .then((getQuestions) => {
         // questions = getQuestions;
        // To format the original question to the needed questions
        questions = getQuestions.results.map((getQuestion) => {
            const selectedQuestion = {
                question: getQuestion.question,
            };

            const rightAnswer = [...getQuestion.incorrect_answers];// incorrect_answers for API
            selectedQuestion.answer = Math.floor(Math.random() * 5) + 1;
            rightAnswer.splice(
                selectedQuestion.answer - 1,
                0,
                getQuestion.correct_answer
            );

            rightAnswer.forEach((point, index) => {
                selectedQuestion['choice' + (index + 1)] = point;
            });

            return selectedQuestion;
        });
        startQuiz();
         // console.log(getQuestions.results)
    })
    .catch((err) => {
        console.error(err);
    });


// point
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

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


// startQuiz()


   // const classToApply = "incorrect";
        // if (selectedAnswer == currentQuestion.answer) {
        //     classToApply = "correct"
        // };