import React, { Component } from 'react'
// import React, { useState, useEffect, useRef } from 'react'
import { GoogleApiWrapper } from 'google-maps-react';
import { utilService } from '../../services/utilService';
import { userService } from '../../services/userService';
import { socketService } from '../../services/socketService';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';


class _CellLocation extends Component {

  state = {
    position: null,
    placeName: ''
  }

  componentDidMount() {
    // console.log('did mount');
    // console.log(this.props);
    if (this.props.task && this.props.task.location) {
      this.setState({ position: this.props.task.location.pos, placeName: this.props.task.location.name })
    }
    this.renderAutoComplete();
  }


  componentDidUpdate(prevProps) {
    // console.log('did update');
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }
  handleChange = ({ target }) => {
    // console.log('handle change');
    const { name } = target
    const { value } = target
    this.setState({ ...this.state, [name]: value })
  }

  onChangeLoc = async () => {
    // ev.preventDefault();
    const newLocation = {
      pos: this.state.position,
      name: this.state.placeName
    }
    this.props.task.location = newLocation
    const newBoard = { ...this.props.board }
    const newActivity = {
      id: utilService.makeId(),
      type: 'Location changed',
      createdAt: Date.now(),
      byMember: userService.getLoggedinUser(),
      task: {
        id: this.props.task.id,
        title: this.props.task.title,
        changedItem: newLocation.name
      },
      group: {
        id: this.props.group.id,
        title: this.props.group.title
      }
    }
    newBoard.activities.unshift(newActivity)
    await this.props.updateBoard(newBoard)
    await socketService.emit('board updated', newBoard._id);
    console.log(this.props.board);
  }

  onRemoveloc = async()=>{
    // console.log('remove loc');
    const newBoard = { ...this.props.board }
    const newActivity = {
      id: utilService.makeId(),
      type: 'Location removed',
      createdAt: Date.now(),
      byMember: userService.getLoggedinUser(),
      task: {
        id: this.props.task.id,
        title: this.props.task.title,
        // changedItem: this.props.task.location.name
      },
      group: {
        id: this.props.group.id,
        title: this.props.group.title
      }
    }
    this.props.task.location = null
    newBoard.activities.unshift(newActivity)
    await this.props.updateBoard(newBoard)
    await socketService.emit('board updated', newBoard._id);
  }

  renderAutoComplete() {
    const { google } = this.props;
    if (!google) return;

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) return;

      console.log(place.geometry.location.lat(), place.geometry.location.lng(), place.formatted_address);
      const pos = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
      const placeName = place.formatted_address
      console.log(pos, placeName);
      this.setState({ position: place.geometry.location, placeName: place.formatted_address }, () => { 
        console.log(this.state);
        this.onChangeLoc() });
    });
  }

  onSetMap = () => {
    if (!this.props.task.location || !this.props.task.location.pos) return this.autocomplete.focus()
    this.props.setMap(this.props.task.location.pos)
  }

  render() {
    const { task } = this.props
    // if (!task || !task.location) return <div></div>
    const { placeName } = this.state
    return (
      <div className="cell-location flex">
        <span onClick={() => this.onSetMap()} className="flex"><LocationOnOutlinedIcon /></span>
        <form>
          <input
            name="placeName"
            placeholder="Enter a location"
            ref={ref => (this.autocomplete = ref)}
            type="text"
            onChange={this.handleChange}
            value={placeName}
          />
        </form>
        {task.location &&  <span className="flex"><i className="fas close" onClick={() => this.onRemoveloc()}></i></span>}
      </div>
    )
  }
}

export const CellLocation = GoogleApiWrapper((props) => ({
  apiKey: ('AIzaSyA1TpSPtsJIgXzeaeenK7R2XPSz5MzrSkk'),
  task: props.task,
  group: props.group,
  board: props.board
}))(_CellLocation)


