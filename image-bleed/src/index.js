import "normalize.css"

import { calculateHeightMultiple, calculateClickY, calculateCanvasSize, insertImage, lastImage } from "./js/canvas.js"
import { parseUpload } from "./js/upload.js"
import { saveCanvas } from "./js/save.js"
import { bleedCanvas } from "./js/bleed.js"

import "./scss/main.scss"
import "./images/starter-1.png"
import "./images/starter-2.png"
import "./images/starter-3.png"
import "./images/starter-4.png"
import "./images/banner.png"

// elements
var mainCanvas = document.getElementById("content--canvas")
var mainCanvasContainer = document.getElementById("content--canvas__container")
var mainCanvasContext = mainCanvas.getContext("2d")
mainCanvasContext.scale(2, 2)

var bleedHeightText = document.getElementById("content--info__bleed-height")
var bleedHeightSlider = document.getElementById("content--info__range")
var bleedHeightTip = document.getElementById("content--info__tip")

var logoFillLayer = document.getElementById("header--image__fill")

var uploadButton = document.getElementById("hidden--image-upload")
var saveButton = document.getElementById("content--info__button--save")

// JS is enabled
document.getElementById("content--container").style.display = "flex"

uploadButton.onchange = e => {
  parseUpload(e)
  .then(image => {
    insertImage(image, mainCanvas, mainCanvasContext, mainCanvasContainer, bleedHeightSlider, bleedHeightText, logoFillLayer)
  })
}

saveButton.onclick = e => {
  saveCanvas(mainCanvas)
}

var initialImages = [
  "images/starter-1.png",
  "images/starter-2.png",
  "images/starter-3.png",
  "images/starter-4.png"
]

var starterImage = new Image()
starterImage.src = initialImages[Math.floor(Math.random() * initialImages.length)]
starterImage.onload = () => {
  insertImage(starterImage, mainCanvas, mainCanvasContext, mainCanvasContainer, bleedHeightSlider, bleedHeightText, logoFillLayer)
}

function bleedTipUpdate() {
  if (window.matchMedia("(max-width: 760px)").matches) {
    bleedHeightTip.innerHTML = "Tap to bleed"
  } else {
    bleedHeightTip.innerHTML = "Click to bleed"
  }
}
bleedTipUpdate()

window.onresize = e => {
  insertImage(lastImage, mainCanvas, mainCanvasContext, mainCanvasContainer, bleedHeightSlider, bleedHeightText, logoFillLayer)
  bleedTipUpdate()
}

mainCanvas.addEventListener("click", e => {
  var y = calculateClickY(mainCanvas, e)
  bleedCanvas(mainCanvas, mainCanvasContext, y, bleedHeightSlider.value * calculateHeightMultiple(mainCanvas))
})

bleedHeightSlider.addEventListener("input", e => {
  bleedHeightText.innerHTML = `Bleed height ${e.target.value}`
})