import { saveAs } from "file-saver/FileSaver"

export function saveCanvas(canvas) {
  canvas.toBlob(blob => {
    saveAs(blob, "image.png")
  })
}