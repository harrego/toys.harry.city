export function bleedCanvas(canvas, canvasContext, y, height) {
  var slicedPixelRow = canvasContext.getImageData(0, y, canvas.width, 1)

  var tempCanvas = document.createElement("canvas")
  tempCanvas.width = canvas.width
  tempCanvas.height = 1

  var tempCanvasContext = tempCanvas.getContext("2d")
  tempCanvasContext.scale(2, 2)
  tempCanvasContext.putImageData(slicedPixelRow, 0, 0)

  var pixelRowImage = new Image()
  pixelRowImage.src = tempCanvas.toDataURL()
  pixelRowImage.onload = () => {
    canvasContext.drawImage(pixelRowImage, 0, y, canvas.width, height)
  }
}