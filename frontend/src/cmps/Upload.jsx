import { Component } from 'react'
import { cloudinaryService } from '../services/cloudinaryService'

export class Upload extends Component {
  state = {
    imgUrl: null,
    height: 500,
    width: 500,
    isUploading: false
  }
  uploadImg = async (ev) => {
    this.setState({ isUploading: true })
    const { secure_url, height, width } = await cloudinaryService.uploadImg(ev)
    this.setState({ isUploading: false, imgUrl: secure_url, height, width })
  }
  get uploadMsg() {
    const { imgUrl, isUploading } = this.state
    if (imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }
  render() {
    const { imgUrl, width, height } = this.state
    const previewStyle = {
      backgroundImage: `url(${imgUrl})`,
      width,
      height
    }
    return (
      <div className="upload-preview" style={ previewStyle } >
        <img src="" alt="" />
        <label htmlFor="imgUpload">{ this.uploadMsg }</label>
        <form>
        <input type="file" onChange={ this.uploadImg } accept="img/*" id="imgUpload" />
        <button></button>
        </form>
      </div>
    )
  }
}
