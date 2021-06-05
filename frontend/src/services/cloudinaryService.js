export const cloudinaryService = {
  uploadImg
}
function uploadImg(ev) {
  const CLOUD_NAME = 'depjjubya'
  const PRESET_NAME = 'hwg6angi'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData();
  formData.append('file', ev.target.files[0])
  formData.append('upload_preset', PRESET_NAME);

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      console.log(res)

      return res
    })
    .catch(err => console.error(err))
}
