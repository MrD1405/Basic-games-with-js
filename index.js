const  startButton=document.getElementById("start-btn");
const questionContainerElement=document.getElementById("question-container");
const questionElement=document.getElementById('question');
const answerButtonsElement=document.getElementById('answer-buttons');
const nextButton=document.getElementById("next-btn");

startButton.addEventListener("click",startGame);
let shuffledQuestions,currentQuestionIndex; 
nextButton.addEventListener("click",()=>{
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame(){
    startButton.classList.add("hide");
    questionContainerElement.classList.remove("hide");
    shuffledQuestions= questions.toSorted(() => Math.random()- .5);
    currentQuestionIndex=0;
    setNextQuestion();
}


function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);

}

function showQuestion(question){
    questionElement.innerHTML=question.question;
    question.answers.forEach(answer =>{
        const button=document.createElement('button');
        button.innerHTML=answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        answerButtonsElement.appendChild(button);

    })
}

//remove all the questions that have already been inserted
function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}
function selectAnswer(e){
    const selectedButton=e.target;
    const correct=selectedButton.dataset.correct;
    setStatusClass(document.body,correct);
    Array.from(answerButtonsElement.children).forEach(button=>{
        setStatusClass(button,button.dataset.correct);
    })
    if(shuffledQuestions.length>currentQuestionIndex+1){
        nextButton.classList.remove('hide');
    }
    else{
        startButton.innerHTML='Restart';
        startButton.classList.remove('hide');
    }
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
function setStatusClass(element,correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct');
    }
    else{
        element.classList.add('wrong');
    }
}

const questions=[
    {
        question:'What is 2+2',
        answers:[
            {text:'4',correct:true},
            {text:'22',correct:false},
            {text:'2',correct:false},
            {text:'42',correct:false},
        ]
    },
    {
        question: 'Are you an idiot?',
        answers: [
        { text: 'Yes', correct: true },
        { text: 'No', correct: true },
        { text: 'Think so', correct: true },
        { text: 'Not sure', correct: true }
        ]
    },
    {
        question: 'Is web development fun?',
        answers: [
        { text: 'Kinda', correct: false },
        { text: 'YES!!!', correct: true },
        { text: 'Um no', correct: false },
        { text: 'IDK', correct: false }
        ]
    },
    {
        question: 'What is 4 * 2?',
        answers: [
        { text: '6', correct: false },
        { text: '8', correct: true }
        ]
    }
]