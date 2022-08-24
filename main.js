const mario = document.querySelector('.mario')
const pope = document.querySelector('.pipe')
const gameOver = document.querySelector('.game-over')
const buttonInit = document.querySelector('.init')
const scoreBoard = document.querySelector('.score')

let initialScore = 0

const startGame = () => {
  pope.classList.add('pipe-animation')
  jump()
  scoreBoard.classList.add('scoreShow')
  buttonInit.style.display = 'none'
}

const restartGame = () => {
  gameOver.style.display = 'none'
  pope.style.left = ''
  pope.style.right = '0'
  console.log(pope)
  mario.src = './assets/mario.gif'
  mario.style.width = '150px'
  mario.style.bottom = '0'
  buttonInit.style.display = 'block'

  scoreBoard.classList.remove('scoreShow')
  scoreBoard.innerHTML = ''
  initialScore = 0
}

const jump = () => {
  mario.classList.add('jump')
  setTimeout(() => {
    mario.classList.remove('jump')
  }, 500)
}



const score = () => {
  initialScore
  setInterval(() => {
    const pipePos = pope.offsetLeft
    const marioPos = window.getComputedStyle(mario).bottom.replace('px', '')
    if (pipePos <= 120 && pipePos > 105 && marioPos >= 120) {
      scoreBoard.innerHTML = `Score: ${(initialScore ++)}`
    }else {
      scoreBoard.innerHTML = `Score: ${initialScore}`
    }
  }, 10)

  if(restartGame) {
    initialScore = 0
    scoreBoard.innerHTML = `Score: ${initialScore}`
    clearInterval(score)
  }
}

const loop = () => {
  setInterval(() => {
    const pipePos = pope.offsetLeft
    const marioPos = window.getComputedStyle(mario).bottom.replace('px', '')

    if (pipePos <= 120 && pipePos > 105 && marioPos < 80) {
      pope.classList.remove('pipe-animation')
      pope.style.left = `${pipePos}px`

      mario.classList.remove('jump')
      mario.style.bottom = `${marioPos}px`

      mario.src = './assets/game-over.png'
      mario.style.width = '80px'
      mario.style.marginLeft = '50px'

      gameOver.style.display = 'flex'
      // gameOver.innerHTML = `<h1>Game Over</h1><p>Score: ${scoreBoard.innerHTML}</p>`

      clearInterval(loop)
    }

  }, 10)
}

loop()

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'Enter') {
    startGame()
    score()
  }
})

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === ' ') {
    jump()
  }
})
