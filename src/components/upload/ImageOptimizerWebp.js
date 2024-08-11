// Convert image to webp optimized image



export const blobToBase64 = (file) => { // blob to canvas
  return new Promise((resolve) => {
    let src = file
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let userImage = new Image()
    userImage.src = src // result : blob:localhost/.....
    userImage.onload = function () {
      canvas.width = userImage.width
      canvas.height = userImage.height
      ctx.drawImage(userImage, 0, 0)
      let webpImage
      webpImage = canvas.toDataURL("image/webp", 0.2) // 0.3 = quality 
      return resolve(webpImage)
    }
  })
}


export const base64ToBlob = (base64String) => { // return to image file
  var arr = base64String.split(","),
    mime = arr[0].match(/:(.*?)/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], 'tempfile', { type: mime })
}
