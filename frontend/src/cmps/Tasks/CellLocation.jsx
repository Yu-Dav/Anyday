import React, { useState, useEffect, useRef, Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { utilService } from '../../services/utilService';
import { userService } from '../../services/userService';
import { socketService } from '../../services/socketService';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

// const useStateWithCallback = (initialState, callback) => {
//   const [state, setState] = useState(initialState);

//   useEffect(() => callback(state), [state, callback]);

//   return [state, setState];
// };

// const _CellLocation = (props) => {

//   const [position, setPosition] = useState(null)
//   const [placeName, setPlaceName] = useState('')
//   const autocompleteRef = useRef()


//   useEffect(() => {
//     // console.log(props);
//     if (props.task && props.task.location) {
//       setPosition(props.task.location.pos)
//       setPlaceName(props.task.location.name)
//     }
//     // renderAutoComplete()
//   }, [])

//   useEffect(() => {
//     renderAutoComplete()
//   }, [placeName])


//   const handleChange = ({ target }) => {
//     // console.log('handle change');
//     // const { name } = target
//     const { value } = target
//     setPlaceName(value)
//   }

//   const onChangeLoc = async () => {
//     // ev.preventDefault();
//     const newLocation = {
//       pos: position,
//       name: placeName
//     }
//     console.log('loc in on change loc', newLocation);
//     props.task.location = newLocation
//     const newBoard = { ...props.board }
//     const newActivity = {
//       id: utilService.makeId(),
//       type: 'Location changed',
//       createdAt: Date.now(),
//       byMember: userService.getLoggedinUser(),
//       task: {
//         id: props.task.id,
//         title: props.task.title,
//         changedItem: newLocation.name
//       },
//       group: {
//         id: props.group.id,
//         title: props.group.title
//       }
//     }
//     newBoard.activities.unshift(newActivity)
//     // await props.updateBoard(newBoard)
//     // await socketService.emit('board updated', newBoard._id);
//     console.log(props.board);
//   }

//   const onRemoveloc = async () => {
//     // console.log('remove loc');
//     const newBoard = { ...props.board }
//     const newActivity = {
//       id: utilService.makeId(),
//       type: 'Location removed',
//       createdAt: Date.now(),
//       byMember: userService.getLoggedinUser(),
//       task: {
//         id: props.task.id,
//         title: props.task.title,
//         // changedItem: this.props.task.location.name
//       },
//       group: {
//         id: props.group.id,
//         title: props.group.title
//       }
//     }
//     props.task.location = null
//     newBoard.activities.unshift(newActivity)
//     await props.updateBoard(newBoard)
//     await socketService.emit('board updated', newBoard._id);
//   }

//   const renderAutoComplete = () => {
//     const { google } = props;
//     // const map = this.map
//     if (!google) return;

//     const autocomplete = new google.maps.places.Autocomplete(autocompleteRef.current);
//     autocomplete.addListener('place_changed', () => {
//       const place = autocomplete.getPlace();

//       if (!place.geometry) return;

//       console.log(place.geometry.location.lat(), place.geometry.location.lng(), place.formatted_address);
//       const pos = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
//       const placeName = place.formatted_address
//       console.log(pos, placeName);
//       setPosition(place.geometry.location)
//       setPlaceName(place.formatted_address)
//       // onChangeLoc()
//     });
//   }

//   useEffect(() => {
//     if (props.task && props.task.location && props.task.location.pos && position) {
//       if (position.lat !== props.task.location.pos.lat && position.lng !== props.task.location.pos.lng) {
//         console.log('pos in use effect', position, placeName);
//         onChangeLoc()
//       }
//       // console.log(position, placeName);
//     }
//   }, [position])

//   const onSetMap = () => {
//     if (!props.task.location || !props.task.location.pos) return autocompleteRef.current.focus()
//     props.setMap(props.task.location.pos)
//   }


//   return (
//     <div className="cell-location flex">
//       <span onClick={() => onSetMap()} className="flex"><LocationOnOutlinedIcon /></span>
//       <form>
//         <input
//           name="placeName"
//           placeholder="Enter a location"
//           ref={autocompleteRef}
//           type="text"
//           onChange={handleChange}
//           value={placeName}
//         />
//       </form>
//       {props.task.location && <span className="flex"><i className="fas close" onClick={() => onRemoveloc()}></i></span>}
//     </div>
//   )

// }

// export const CellLocation = GoogleApiWrapper((props) => ({
//   apiKey: ('AIzaSyA1TpSPtsJIgXzeaeenK7R2XPSz5MzrSkk'),
//   task: props.task,
//   group: props.group,
//   board: props.board
// }))(_CellLocation)





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
    const map = this.map
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
    const { placeName, position } = this.state
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
        {this.props.task.location &&  <span className="flex"><i className="fas close" onClick={() => this.onRemoveloc()}></i></span>}
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

