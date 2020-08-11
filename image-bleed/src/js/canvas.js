export var lastImage

export function calculateHeightMultiple(canvas) {
  return canvas.height / parseInt(canvas.style.height)
}

export function calculateClickY(canvas, event) {
  var heightMultiple = calculateHeightMultiple(canvas)

  return Math.round((event.pageY - canvas.getBoundingClientRect().top) * heightMultiple)
}

export function calculateCanvasSize(canvas, canvasContainer) {
  var canvasHeight = canvas.height
  var canvasWidth = canvas.width

  canvas.height = null
  canvas.width = null

  canvas.style.height = null
  canvas.style.width = null

  return { height: canvasContainer.offsetHeight, width: Math.round((canvasContainer.offsetHeight / canvasHeight) * canvasWidth) }
}

export function insertImage(image, canvas, canvasContext, canvasContainer, bleedHeightSlider, bleedHeightText, svgFillLayer) {
  canvas.height = image.height
  canvas.width = image.width

  var canvasSize = calculateCanvasSize(canvas, canvasContainer)
  canvas.style.height = canvasSize.height + "px"
  canvas.style.width = canvasSize.width + "px"

  canvas.height = image.height
  canvas.width = image.width

  bleedHeightSlider.min = 1
  bleedHeightSlider.max = canvasSize.height
  if (bleedHeightSlider.value >= canvasSize.height) {
    bleedHeightSlider.value = canvasSize.height
    bleedHeightText.innerHTML = `Bleed height ${bleedHeightSlider.value}`
  }

  canvasContext.drawImage(image, 0, 0)
  lastImage = image

  var averageColor = findCanvasColor(canvas, canvasContext)
  if (averageColor.r >= 240 && averageColor.g >= 240 && averageColor.b >= 240) {
    svgFillLayer.style.fill = null
  } else {
    svgFillLayer.style.fill = `rgb(${averageColor.r}, ${averageColor.g}, ${averageColor.b})`
  }
}

function findCanvasColor(canvas, canvasContext) {
  var data = canvasContext.getImageData(0, 0, canvas.width, canvas.height)
  var count = 0

  var rgb = {r: 0, g: 0, b: 0}
  var i = 0

  while ((i += 20) < data.data.length) {
    count += 1
    rgb.r += data.data[i]
    rgb.g += data.data[i + 1]
    rgb.b += data.data[i + 2]
  }

  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb
}