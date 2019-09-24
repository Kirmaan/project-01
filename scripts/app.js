window.addEventListener('DOMContentLoaded', () => {
  const board = []
  const boardWidth = 26
  const boardHeight = 16

  let snakeX
  let snakeY
  let snakeLength
  let snakeDirection

  // let score = document.getElementById('score').innerHTML
  // console.log(score)

  function setupGame() {
    const boardElement = document.getElementById('board')

    for (let y = 0; y < boardHeight; ++y) {
      const row = []
      for (let x = 0; x < boardWidth; ++x) {
        const cell = {}

        // Create a <div></div> and store it in the cell object
        cell.element = document.createElement('div')

        // Add it to the board
        boardElement.appendChild(cell.element)

        // Add to list of all
        row.push(cell)
      }

      // Add this row to the board
      board.push(row)
    }

    startGame()

    // Start the game loop (it will call itself with timeout)
    gameLoop()
  }

  function placeApple() {
    // A random coordinate for the apple
    const appleX = Math.floor(Math.random() * boardWidth)
    const appleY = Math.floor(Math.random() * boardHeight)

    board[appleY][appleX].apple = 1
  }

  function startGame() {
    // Default position for the snake in the middle of the board.
    snakeX = Math.floor(boardWidth / 2)
    snakeY = Math.floor(boardHeight / 2)
    snakeLength = 5
    snakeDirection = 'Up'

    // Clear the board
    for (let y = 0; y < boardHeight; ++y) {
      for (let x = 0; x < boardWidth; ++x) {
        board[y][x].snake = 0
        board[y][x].apple = 0
      }
    }

    // Set the center of the board to contain a snake
    board[snakeY][snakeX].snake = snakeLength

    // Place the first apple on the board.
    placeApple()
  }

  function gameLoop() {

    // Update position depending on which direction the snake is moving.
    switch (snakeDirection) {
      case 'Up': snakeY--; break
      case 'Down': snakeY++; break
      case 'Left': snakeX--; break
      case 'Right': snakeX++; break
    }

    // Check for walls, and restart if we collide with any
    if (snakeX < 0 || snakeY < 0 || snakeX >= boardWidth || snakeY >= boardHeight) {
      startGame()
    }

    // Tail collision
    if (board[snakeY][snakeX].snake > 0) {
      startGame()
    }

    // Collect apples
    if (board[snakeY][snakeX].apple === 1) {
      snakeLength++
      board[snakeY][snakeX].apple = 0
      placeApple()
    }

    let highScore = 0 
    const currentScore = snakeLength - 5
    console.log(currentScore)
    if (highScore > currentScore) {
      console.log('true')
    }
   
    // console.log(snakeLength)
    // Setting The Current Score
    document.getElementById('score').innerHTML = `Your Current Score Is ${snakeLength - 5}`
    // Set The Highest Score (Pull From Local Storage)
    
    // console.log(highScore)
    // document.getElementById('highScore').innerHTML = `Your All Time High Score Is ${highScore}`

    
 
    
    
    // Update the board at the new snake position
    board[snakeY][snakeX].snake = snakeLength

    // Loop over the entire board, and update every cell
    for (let y = 0; y < boardHeight; ++y) {
      for (let x = 0; x < boardWidth; ++x) {
        const cell = board[y][x]

        if (cell.snake > 0) {
          cell.element.className = 'snake'
          cell.snake -= 1
        } else if (cell.apple === 1) {
          cell.element.className = 'apple'
        } else {
          cell.element.className = ''
        }
      }
    }

    // This function calls itself, with a timeout of 1000 milliseconds
    setTimeout(gameLoop, 1000 / snakeLength)
  }
  
  document.body.onkeydown = function enterKey(event) {
    // Update direction depending on key hit
    switch (event.key) {
      case 'ArrowUp': snakeDirection = 'Up'; break
      case 'ArrowDown': snakeDirection = 'Down'; break
      case 'ArrowLeft': snakeDirection = 'Left'; break
      case 'ArrowRight': snakeDirection = 'Right'; break
    }

    // This prevents the arrow keys from scrolling the window
    event.preventDefault()
  }
  setupGame()
}) 