import { saveAs } from "file-saver/FileSaver"

import "normalize.css"
import "./scss/main.scss"

import "./images/tshirt1-outer.png"
import "./images/tshirt1-inner.png"

import "./images/patterns/1.jpg"
import "./images/patterns/2.jpg"
import "./images/patterns/3.jpg"
import "./images/patterns/4.jpg"
import "./images/patterns/5.jpg"
import "./images/patterns/6.jpg"
import "./images/patterns/7.jpg"
import "./images/patterns/8.jpg"

import "./images/banner.png"

var patterns = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpg",
  "images/7.jpg",
  "images/8.jpg"
]

var elements = {
  canvasContainer: document.getElementById("tshirt--canvas__container"),
  uploadButton: document.getElementById("tshirt--design-upload"),
  saveButton: document.getElementById("tshirt--save-button")
}

var canvas = document.getElementById("tshirt--canvas")
canvas.width = 750
canvas.height = 1000

var context = canvas.getContext("2d")
context.scale(2, 2)
context.clearRect(0, 0, canvas.width, canvas.height)

function drawCanvas(src) {
  canvas.style.opacity = "0"

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.globalAlpha = 1

  var image = new Image()
  image.src = src
  image.onload = () => {
    context.drawImage(image, 55, 150, 263, 340)

    var outer = new Image()
    outer.src = "images/tshirt1-outer.png"
    outer.onload = () => {
      context.drawImage(outer, 0, 0, 375, 500)

      var inner = new Image()
      inner.src = "images/tshirt1-inner.png"
      inner.onload = () => {
        context.globalAlpha = 0.30
        context.drawImage(inner, 0, 0, 375, 500)
        canvas.style.opacity = "1"
      }
    }
  }
}

var randomPattern = patterns[Math.floor(Math.random() * patterns.length)]
drawCanvas(randomPattern)

elements.uploadButton.onchange = e => {
	var files = e.target.files
	var fileReader = new FileReader()

	fileReader.onload = function(reader) {
    console.log("file reader")
		drawCanvas(reader.target.result)
	}

	fileReader.readAsDataURL(files[0])
}

elements.saveButton.onclick = e => {
  canvas.toBlob(blob => {
    saveAs(blob, "custom-tshirt.png")
  })
}
