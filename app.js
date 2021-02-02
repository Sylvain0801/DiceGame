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
  //efface l'ancienne class active
  point.forEach(item => item.classList.remove('active'))
  //injecte la nouvelle class active aléatoirement
  no = Math.floor(Math.random() * 6)
  no === 0 ? allFace[no].classList.add('active')
  : allFace[no].forEach(item => item.classList.add('active'))
}

const newDice = () => {
  if (!animation) {
    // détermine la durée de l'animation entre 500 et 2000ms
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
dice.addEventListener('click', (e) => newDice())

const whoStartPlaying = () => {
  //détermine le joueur qui commence en fonction du résultat du dé
  no % 2 === 0 ? activePlayer = 0 : activePlayer = 1
  //affiche un point rouge à côté du joueur actif
  whoIsPlaying(activePlayer)
  isPlaying = true
}

// gestion button new game
const newGame = document.getElementById('new-game')

newGame.addEventListener('click', (e) => initGame())

const initGame = () => {
  //réinitialise tous les compteurs de score
  [...current, ...global].forEach(value => value.textContent = '00')
  // empêche l'affectation du résultat du dé au score courant
  isPlaying = false
  //lance le dé pour déterminer le joueur qui commence
  newDice()
}

// gaming
const hold = document.getElementById('hold')

hold.addEventListener('click', (e) => {
  //additionne le score courant du joueur actif à son score global
  global[activePlayer].textContent = formatNumberTwoDigits(parseInt(global[activePlayer].textContent) + parseInt(current[activePlayer].textContent))
  // si le score global du joueur actif est >= 100 alors il gagne
  if (parseInt(global[activePlayer].textContent) >= 100) {
    winnerIs()
  } else {
  // sinon on réinitialise son score courant et l'autre joueur prend la main
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
  player[active].classList.add('active-player') //affiche le point rouge
  player[!active * 1].classList.remove('active-player') //efface le point rouge
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

// gestion popup winner 
const winnerIs = () => {
  const popupWinner =  document.querySelector('.winner-container')
  const winner =  document.querySelector('.winner')
  const popup =  document.querySelector('.winner-popup')
  const popupClose = document.getElementById('popup-close')
  const popupNewGame = document.getElementById('popup-newgame')

  // affiche la popup
  winner.textContent = `player ${activePlayer + 1} win !!!`
  popup.style.animation = 'winnerpopup .1s ease-in-out 10 forwards'
  popupWinner.style.visibility = 'visible'

  // bouton pour fermer la popup
  popupClose.addEventListener('click', (e) => {
    popupWinner.style.visibility = 'hidden'
    popup.style.animation = 'none'
  })
  
  // bouton pour fermer la popup et réinitialiser le jeu
  popupNewGame.addEventListener('click', (e) => {
    popupWinner.style.visibility = 'hidden'
    popup.style.animation = 'none'
    initGame()
  })
}

// init game
newDice()