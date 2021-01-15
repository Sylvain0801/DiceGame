const f1 = document.querySelector('.nose')
const f2 = document.querySelectorAll('.ne, .so')
const f3 = document.querySelectorAll('.nose, .ne, .so')
const f4 = document.querySelectorAll('.ne, .so, .no, .se')
const f5 = document.querySelectorAll('.nose, .ne, .so, .no, .se')
const f6 = document.querySelectorAll('.ne, .so, .no, .se, .e, .o')
const point = document.querySelectorAll('.point')

const allFace = [f1, f2, f3, f4, f5, f6]

const player1 = document.getElementById('player-1')
const player2 = document.getElementById('player-2')


const current1 = document.getElementById('current-1')
const current2 = document.getElementById('current-2')
const current = [current1, current2]
const global1 = document.getElementById('global-1')
const global2 = document.getElementById('global-2')

var activePlayer = 1
var isPlaying = false

// gestion button roll dice
const rollDice = document.getElementById('roll-dice')
const dice = document.querySelector('.dice')

const delay = 150

var animation

var no = 1

const duration = Math.floor(Math.random() * 1500 + 500)

const launch = () => {
  setTimeout((delay) => removeActive(), delay / 3)
  randomDice()
}

const randomDice = () => {
  no = Math.floor(Math.random() * 6)
  displayDice(no)
}

const displayDice = (no) => {
  no === 0 ? (f1.classList.add('active'))
  : (allFace[no].forEach(item => {
    item.classList.add('active')
  }))
}

const removeActive = () => {
  point.forEach(item => item.classList.remove('active'))
}

const newDice = () => {
  animation = setInterval((delay) => launch(), delay)
  dice.style.animation = `shake .1s ease-in-out ${duration / 100} backwards`
  setTimeout(() => {
    clearInterval(animation)
    setTimeout( delay => displayDice(no), delay)
    dice.style.animation = 'none'
    animation = null
    if (isPlaying) {
      current[activePlayer].textContent = formatNumberTwoDigits(parseInt(current[activePlayer].textContent) + no + 1)
    }
    return no
  }, duration)
}

const formatNumberTwoDigits = value => {
  value = value.toString()
  if (value.length === 1) {
    value = '0' + value
  }
  return value
}

rollDice.addEventListener('click', (e) => {
  newDice()
})

const whoStartPlaying = (no) => {
  no % 2 === 0 ? (
    console.log(typeof no),
    activePlayer = 1,
    player2.classList.add('active-player'),
    player1.classList.remove('active-player')
    ) : (
    activePlayer = 0,
    player1.classList.add('active-player'),
    player2.classList.remove('active-player')
    )
  isPlaying = true
}
// gestion button new game
const newGame = document.getElementById('new-game')

newGame.addEventListener('click', (e) => {
  current1.textContent = current2.textContent = '00'
  global1.textContent = global2.textContent = '00'
  isPlaying = false
  newDice()
  setTimeout(duration => whoStartPlaying(no), duration)
})

newDice()
setTimeout(duration => whoStartPlaying(no), duration)