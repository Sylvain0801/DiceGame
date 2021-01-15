const f1 = document.querySelector('.nose')
const f2 = document.querySelectorAll('.ne, .so')
const f3 = document.querySelectorAll('.nose, .ne, .so')
const f4 = document.querySelectorAll('.ne, .so, .no, .se')
const f5 = document.querySelectorAll('.nose, .ne, .so, .no, .se')
const f6 = document.querySelectorAll('.ne, .so, .no, .se, .e, .o')
const point = document.querySelectorAll('.point')

const allFace = [f1, f2, f3, f4, f5, f6]

// gestion button roll dice
const rollDice = document.getElementById('roll-dice')
const dice = document.querySelector('.dice')

const delay = 250

var animation

var no = 0

const duration = Math.floor(Math.random() * 3000 + 1000)

const launch = () => {
  setTimeout((delay) => removeActive(), delay / 3)
  randomDice()
}

const randomDice = () => {
  no = Math.floor(Math.random() * 6)
  displayDice(no)
  return no
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

rollDice.addEventListener('click', (e) => {
  e.stopPropagation()
  animation = setInterval((delay) => launch(), delay)
  dice.style.animation = `shake .1s ease-in-out ${duration / 100} backwards`
  setTimeout(() => {
    clearInterval(animation),
    setTimeout( delay => displayDice(no), delay),
    dice.style.animation = 'none',
    animation = null
  }, duration)
})

randomDice()

// gestion button new game
const newGame = document.getElementById('new-game')

newGame.addEventListener('click', () => {
  randomDice()
})