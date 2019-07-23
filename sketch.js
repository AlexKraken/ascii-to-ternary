const backgroundColor = '#262626'
const colorPalette = ['#63aabc', '#ed3833', '#60204b', '#f9f3ec', '#000000'] // 0, 1, 2 trit colors, background color, outline color
const tryteDimensions = [70, 100, 5] // width, height, corner radius
const tryteLayout = [
  [10, 10, 20, 20],
  [40, 10, 20, 20],
  [10, 40, 20, 20],
  [40, 40, 20, 20],
  [10, 70, 20, 20],
  [40, 70, 20, 20]
]
const spacing = 10

let inputBox

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight)
  canvas.style('display', 'block')

  inputBox = createInput("Enter text here")
  positionInput(inputBox)

  noLoop()
}

function draw() {
  background(backgroundColor)
  translate(spacing, spacing)

  let text = inputBox.value()
  let column = 0
  let row = 0

  for (let i = 0; i < text.length; i++) {
    push()
    translate(column, row)
    drawTryte(text.charCodeAt(i))
    pop()

    column += tryteDimensions[0] + spacing
    if (column + tryteDimensions[0] + 2 * spacing > width) {
      column = 0
      row += tryteDimensions[1] + spacing
    }
  }
}

function drawTryte(decimal) {
  let powers = [1, 3, 9, 27, 81, 243]
  let tryte = []
  let colors = colorPalette.map(swatch => color(swatch))

  for (let i = powers.length - 1; i >= 0; i--) {
    let division = floor(decimal / powers[i])

    tryte[powers.length - (i + 1)] = division
    decimal = decimal % powers[i]
  }

  fill(colors[3])
  stroke(colors[4])
  rect(0, 0, ...tryteDimensions)
  
  tryte.map((value, index) => {
    fill(colors[value])
    rect(...tryteLayout[index])
  })
}

function positionInput(box) {
  box.position(spacing, height - spacing - 20)
  box.attribute('size', '75')
}

function keyReleased() {
  redraw()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  positionInput(inputBox)
  redraw()
}