/* eslint-disable no-unused-vars */
import snake from './snake.js'
import apple from './apple.js'
import board from './board.js'

function play () {
  snake.draw()
  apple.place(board)
}
