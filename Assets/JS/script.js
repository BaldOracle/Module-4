var timerEl = document.getElementById('countdown');
var testEl = document.getElementById('test')
var answerOption = document.getElementById('options')
var askQuestion = document.getElementById('question')
var inputName = document.getElementById('name')
var bigButton = document.getElementById('bigButton')
var scoreBoard = document.getElementById('scoreName')
var finalName = localStorage.getItem("saveName")
var finalScore = localStorage.getItem("saveScore")
var clearScore = document.getElementById('clearScore')
var hiScoreButton = document.getElementById('scoreButton')
var tieScore = document.getElementById('tie')
var saveScore  = 0 
var saveName = "The Man"
var quiz = [];
var questionNum = -1
var score = 0
var remainingTime = 25

//quiz question array
quiz = [
    {
        question: 'How are you?',
        options: ['Good', 'Bad'],
        answer: 'Good'
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


//default display on page
timerEl.textContent = "Click start to begin. You have: " + remainingTime + " seconds."
inputName.style.display = "none"
bigButton.style.display = "none"
clearScore.style.display = "none"
scoreBoard.style.display = 'none'
tieScore.style.display = 'none'

//timer set timer remaining time for how long you get on the quiz
function countdown() {
    hiScoreButton.style.display = 'none'
var timer = setInterval(function () {
    remainingTime--;
    timerEl.textContent = remainingTime + " seconds remaining"

    if (remainingTime === 0) {
        // console.log("done")
        clearInterval(timer)
        highScore();
        // alert("End of Quiz!")
    } else if ( remainingTime <= 0 ){
        
        clearInterval(timer)
        highScore();
    }
}, 1000);

}

//function to verify the answer is correct. 
function checkAnswer () {
    scoreBoard.style.display = 'initial'
    var actualAnswer = quiz[questionNum].answer
    var chosenAnswer = this.textContent
    this.style.backgroundColor = "green"
    this.style.fontWeight = 'bold';
    // askQuestion.removeChild(h2);
    // console.log(actualAnswer,chosenAnswer)

    if (remainingTime > 0) {
    if (actualAnswer === chosenAnswer) {
        score ++
        scoreBoard.innerHTML = 'Correct'
        // console.log(score)
    } else {
        remainingTime -=5
        scoreBoard.innerHTML = 'Wrong'
    } 
    //delay to show the answer clicked and to show if answer is right or wrong
    setTimeout(function(){
        scoreBoard.innerHTML = ""
        next ()
    }, 1000) 
    } 
}

//function to go to the next question
function next(){
         questionNum++
    button2.style.display = "none"
    clearScore.style.display = 'none'
    answerOption.textContent = ""
    askQuestion.textContent = ""

    if (questionNum === quiz.length){
        remainingTime = 0
    } 
    
    var h2 = document.createElement ("h2") 
        h2.textContent = quiz[questionNum]?.question
        askQuestion.appendChild(h2);

    for (let i = 0; i < quiz[questionNum]?.options.length; i++ ) {
        
        var li = document.createElement ("button")
        li.textContent = quiz[questionNum].options[i]
        
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
    timerEl.textContent = 'Quiz has ended! Enter your initials!'
    inputName.setAttribute("type",'text')
    //inputName.setAttribute("value",'Enter your Initials')
    inputName.textContent = inputName.value 
    bigButton.style.display = "initial"
    bigButton.innerHTML = 'Submit'
    
    //clearTimeout(highScore)
    //console.log('input initials: ' + inputName.value +" " +'score: ' + score)
}

// function to record high score 
function recordHighScore(){
    hiScoreButton.style.display = 'initial'
    scoreBoard.style.display = 'initial'
    bigButton.style.display = "none"
    button2.style.display = "none"
    inputName.style.display = 'none'
    var liName = document.createElement ("p")
        liName.textContent = inputName + score
        scoreBoard.innerHTML = ('Name: ' + inputName.value +"           " +'Score: ' + score)


        if ( score>finalScore) {
        //localStorage.setItem("saveScore",scoreBoard)
        localStorage.setItem("saveScore",score)
        localStorage.setItem("saveName",inputName.value)
        }
        finalName.textContent = saveName
        finalScore.textContent = saveScore

        console.log(scoreBoard)
        //console.log ('localStorage.setItem("saveName",inputName) ' + localStorage.getItem("saveName",inputName.value) + finalName)
        // console.log('localStorage.setItem("saveScore",score): ', + localStorage.getItem("saveScore"), " ", + finalScore)
        
}

// function to review the highscores. pull local memory 
function reviewHiScore () {
    inputName.style.display = 'none'
    scoreBoard.style.display = 'initial'
    clearScore.style.display = "initial"
    bigButton.style.display = "none"
    button2.style.display = "none"
    timerEl.textContent = "Check out the high Score!"
    if (finalName === null ) {
        scoreBoard.textContent = "High score not set yet!!!"
    } else {
        scoreBoard.textContent = finalName + " " + finalScore
    }
    if ( score>finalScore) {
        scoreBoard.textContent = inputName.value + " " + score
    } else if (score == finalScore) {
        scoreBoard.textContent = inputName.value + " " + score
        tieScore.style.display = "initial"
        tieScore.style.display = 'block'
        tieScore.textContent = finalName + " " + finalScore
    }

    console.log("finalScore " + finalScore + " score " + score)

    
    return null;
}

//function to clear the high score (reset local memory)
function scoreBoardClear () {
    timerEl.textContent = 'High Score Cleared!'
    clearScore.style.display = "initial"
    tieScore.style.display = 'none'
    localStorage.clear();
    scoreBoard.textContent = "Have a go and set the High Score"
}



//start quiz
 button2.addEventListener("click", function(){
    countdown ()
    next ()
 })

 //submit button for initials
 bigButton.addEventListener('click', function(){
    recordHighScore ()
    reviewHiScore ()
    
 })

 //view high score
 scoreButton.addEventListener('click', function(){
    reviewHiScore ()
 })

 //clear high score from local memory
 clearScore.addEventListener('click', function (){
    scoreBoardClear ()
 })

