const allFace = [
      document.querySelector('.nose'),                          //face 1
      document.querySelectorAll('.ne, .so'),                    //face 2          
      document.querySelectorAll('.nose, .ne, .so'),             //face 3
      document.querySelectorAll('.ne, .so, .no, .se'),          //face 4
      document.querySelectorAll('.nose, .ne, .so, .no, .se'),   //face 5
      document.querySelectorAll('.ne, .so, .no, .se, .e, .o')   //face 6
]
const point = document.querySelectorAll('.point')
const player = document.querySelectorAll('#player-1, #player-2')
const current = document.querySelectorAll('#current-1, #current-2')
const global = document.querySelectorAll('#global-1, #global-2')

var activePlayer = 1
var isPlaying = false

// gestion button roll dice
const rollDice = document.getElementById('roll-dice')
const dice = document.querySelector('.dice')
const delay = 150

var animation = null
var no = 1

const launch = () => {
  point.forEach(item => item.classList.remove('active'))
  no = Math.floor(Math.random() * 6)
  no === 0 ? allFace[no].classList.add('active')
  : allFace[no].forEach(item => item.classList.add('active'))
}

const newDice = () => {
  if (!animation) {
    const duration = Math.floor(Math.random() * 1500 + 500)
    animation = setInterval((delay) => launch(), delay)
    dice.style.animation = `shake .1s ease-in-out ${duration / 100} backwards`
    setTimeout(() => {
      clearInterval(animation)
      dice.style.animation = 'none'
      animation = null
      isPlaying ? gaming() : whoStartPlaying()
    }, duration)
  }
}

rollDice.addEventListener('click', (e) => newDice())

const whoStartPlaying = () => {
  no % 2 === 0 ? activePlayer = 0 : activePlayer = 1
  whoIsPlaying(activePlayer)
  isPlaying = true
}
// gestion button new game
const newGame = document.getElementById('new-game')

newGame.addEventListener('click', (e) => initGame())

const initGame = () => {
  [...current, ...global].forEach(value => value.textContent = '00')
  isPlaying = false
  newDice()
}

// gaming
const hold = document.getElementById('hold')

hold.addEventListener('click', (e) => {
  global[activePlayer].textContent = formatNumberTwoDigits(parseInt(global[activePlayer].textContent) + parseInt(current[activePlayer].textContent))
  if (parseInt(global[activePlayer].textContent) >= 100) {
    winnerIs()
  } else {
    current[activePlayer].textContent = '00'
    activePlayer = !activePlayer * 1
    whoIsPlaying(activePlayer)
  } 
})

const formatNumberTwoDigits = value => {
  value.toString().length === 1 && (value = '0' + value) 
  return value
}

const whoIsPlaying = (active) => {
  player[active].classList.add('active-player'),
  player[!active * 1].classList.remove('active-player')
}

const gaming = () => {
  if (no === 0) {
    current[activePlayer].textContent = '00'
    activePlayer = !activePlayer * 1
    whoIsPlaying(activePlayer)
  } else {
    current[activePlayer].textContent = formatNumberTwoDigits(parseInt(current[activePlayer].textContent) + no + 1)
  }
}

// gestion winner 
const winnerIs = () => {
  const popupWinner =  document.querySelector('.winner-container')
  const winner =  document.querySelector('.winner')
  const popup =  document.querySelector('.winner-popup')
  const popupClose = document.getElementById('popup-close')
  const popupNewGame = document.getElementById('popup-newgame')

  winner.textContent = `player ${activePlayer + 1} win !!!`
  popup.style.animation = 'winnerpopup .1s ease-in-out 10 forwards'
  popupWinner.style.visibility = 'visible'
  
  popupClose.addEventListener('click', (e) => {
    popupWinner.style.visibility = 'hidden'
    popup.style.animation = 'none'
  })
  
  popupNewGame.addEventListener('click', (e) => {
    popupWinner.style.visibility = 'hidden'
    popup.style.animation = 'none'
    initGame()
  })
}

// init game
newDice()