var timerEl = document.getElementById('countdown');
var quiz = [];
var testEl = document.getElementById('test')
var questionNum = -1
var answerOption = document.getElementById('options')
var score = 0
var remainingTime = 30
var askQuestion = document.getElementById('question')
var inputName = document.getElementById('name')
var bigButton = document.getElementById('bigButton')
var scoreBoard = document.getElementById('scoreName')
var finalName = localStorage.getItem("inputName")
var finalScore = localStorage.getItem("score")

quiz = [
    {
        question: 'How are you?',
        options: ['good', 'bad'],
        answer: 'good'
    },
    {
        question: 'How much wood would a wood chuck chuck if a wood chuck could chuck wood?',
        options: ['all of it', 'some of it', 'most of it'],
        answer: 'all of it'
    },
    {
        question: "If Tom's mom had 4 children: Nickle, Dime, and Quarter. What is the fourth childs name?",
        options: ['Penny', 'Quarter', 'and', 'Tom'],
        answer: 'Tom'
    }
]

timerEl.textContent = "Click start to begin. You have: " + remainingTime + " seconds."
inputName.style.display = "none"
bigButton.style.display = "none"

//timer set timer remaining time for how long you get on the quiz
function countdown() {
var timer = setInterval(function () {
    remainingTime--;
    timerEl.textContent = remainingTime + " seconds remaining"

    if (remainingTime === 0) {
        // console.log("done")
        clearInterval(timer)
        highScore();
        return null
        // alert("End of Quiz!")
    } else if ( remainingTime <= 0 ){
        
        //clearInterval(timer)
        highScore();
    }
}, 1000);

}
//function to verify the answer is correct. 
function checkAnswer () {
    var actualAnswer = quiz[questionNum].answer
    var chosenAnswer = this.textContent
    this.style.backgroundColor = "green"
    // askQuestion.removeChild(h2);
    console.log(actualAnswer,chosenAnswer)

    if (remainingTime > 0) {
    if (actualAnswer === chosenAnswer) {
        score ++
        scoreBoard.innerHTML = 'Correct'
        console.log(score)
    } else {
        remainingTime -=5
        scoreBoard.innerHTML = 'Wrong'
    } 
    
    setTimeout(function(){
        scoreBoard.innerHTML = ""
        next ()
    }, 1000) 
} else {
    return null;
}
}

//function to go to the next question
function next(){
         questionNum++
    // console.log(quiz[questionNum.valueOf()])
    button2.style.display = "none"
    // console.log(quiz[questionNum])
    // console.log(quiz[questionNum].options)
    answerOption.textContent = ""
    askQuestion.textContent = ""

    if (questionNum === quiz.length){
        remainingTime = 0
    } 
    
    // console.log (questionNum)
    // console.log ("quiz length " + quiz.length)
    var h2 = document.createElement ("h2") 
        h2.textContent = quiz[questionNum].question
        askQuestion.appendChild(h2);

    for (let i = 0; i < quiz[questionNum].options.length; i++ ) {
        
        var li = document.createElement ("li")
        li.textContent = quiz[questionNum].options[i]
        
        // console.log(quiz[questionNum].options[i])
        answerOption.appendChild(li)
        li.onclick = checkAnswer;
        
    }
         
         clearInterval(countdown)
         
}

//function for when timelimit reached or no more questions to record high score. 
function highScore(){
    inputName.style.display = "initial"
    askQuestion.style.display = "none"
    answerOption.style.display = "none"
    timerEl.textContent = 'Quiz has ended! Enter your name!'
    inputName.setAttribute("type",'text')
    //inputName.setAttribute("value",'Enter your Initials')
    inputName.textContent = inputName.value 
    bigButton.style.display = "initial"
    bigButton.innerHTML = 'Submit'
    
    clearTimeout(highScore)
    console.log('input initials: ' + inputName.value +" " +'score: ' + score)
}

// function to record high score 
function recordHighScore(){
    var liName = document.createElement ("p")
        liName.textContent = inputName + score
        scoreBoard.innerHTML = ('Name: ' + inputName.value +"           " +'Score: ' + score)
        localStorage.setItem("score",score)
        localStorage.setItem("inputName",inputName)
        
}


//start quiz
 button2.addEventListener("click", function(){
    countdown ()
    next ()
 })

 bigButton.addEventListener('click', function(){
    recordHighScore ()
 })

