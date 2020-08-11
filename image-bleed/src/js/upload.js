export function parseUpload(formEvent) {
  return new Promise((resolve, reject) => {
    var files = formEvent.target.files
    var fileReader = new FileReader()

    fileReader.readAsDataURL(files[0])

    fileReader.onload = reader => {
      var uploadedImage = new Image()
      uploadedImage.src = reader.target.result

      uploadedImage.onload = () => {
        resolve(uploadedImage)
      }
    }
  })
}