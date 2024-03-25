let randomNumber = Math.floor(Math.random()*10+1)

const input = document.querySelector('#guessField')
const submit = document.querySelector('.guessSubmit')
const guessSlot = document.querySelector('#previousGuesses')
const remaining = document.querySelector('#attempts')
const lowHi = document.querySelector('#lowHi')
const start = document.querySelector('.info')

const p = document.createElement('p')

let prevGuess = []
let attempts = 0
let isplay = true

if(isplay){
    submit.addEventListener('click', (e) => {
        e.preventDefault()
        const guess = parseInt(input.value)
        validate(guess)
    })
}


function validate(guess){
    if(isNaN(guess)){
        displayMessage("Please enter a valid number")
    }
    else if(guess < 1 || guess > 100){
        displayMessage("Please enter a number between 1 and 100")
    }
    else{
        prevGuess.push(guess)

        if(attempts == 10){
            displayGuess(guess)
            displayMessage("You have reached the maximum number of attempts")
            endgame()
        }
        else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess == randomNumber){
        displayMessage("Congratulations! You got it right")
        endgame()
    }
    else if(guess < randomNumber){
        displayMessage("Too low! Try again")
    }
    else{
        displayMessage("Too high! Try again")
    }
}

function displayMessage(message){
    lowHi.innerHTML = `<p style="color:red">${message}</p>`
}

function displayGuess(guess){
    input.value = ''
    guessSlot.innerHTML += `${guess} `
    attempts++
    remaining.innerHTML = `${10 - attempts}`
}

function endgame(){
    input.value = ''
    input.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame" style="cursor:pointer">Start a new game</h2>`
    start.appendChild(p)
    isplay = false
    startOver()
}

function startOver(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', (e) => {
        //take a new random number
        randomNumber = Math.floor(Math.random()*10+1)
        //reset all variables to their default state
        prevGuess = []
        attempts = 0
        guessSlot.innerHTML = ''
        lowHi.innerHTML = ''
        remaining.innerHTML = `${10 - attempts}`
        input.removeAttribute('disabled')
        p.remove()
        isplay = true
    })
}