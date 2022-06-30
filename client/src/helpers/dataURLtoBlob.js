export default function dataURLtoBlob(dataUrl) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataUrl.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataUrl.split(",")[1]);
  else byteString = unescape(dataUrl.split(",")[1]);

  // separate out the mime component
  var miniString = dataUrl.split(",")[0].split(":")[1].split(":")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: miniString });
}
