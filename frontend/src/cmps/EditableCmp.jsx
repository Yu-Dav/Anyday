import React, { useState } from 'react'

export const EditableCmp = (props) => {

    const [isEditing, setIsEditing] = useState(true)



    const handleUpdate = (ev) => {
        if (ev.key === 'Enter' || ev.type === 'blur') {
            setIsEditing(false)
            props.updateFunc(ev)
        }
        setTimeout(() => {
            setIsEditing(true)
        }, 500)
    }

    return (
        <div className={`editable-cmp ${props.className}`} style={props.style} data-name={props.name} data-id={props.id} contentEditable={isEditing}
            suppressContentEditableWarning={true} spellCheck="false"
            onBlur={handleUpdate} onKeyUp={handleUpdate}>
            {props.value}
        </div>
    )
}


// export class EditableCmp extends Component {

//     state = {
//         // txt: this.props.value,
//         isEditing: true
//     }


//     handleUpdate = (ev) => {
//         if (ev.key === 'Enter' || ev.type === 'blur'){
//             this.setState({isEditing: false}, ()=> this.props.updateFunc(ev))
//         } 
//         setTimeout(() => {
//             this.setState({ isEditing: true })
//         }, 500)
//     }

//     render() {
//         const { isEditing } = this.state
//         return (
//             <div className={`editable-cmp ${this.props.className}`} style={this.props.style} data-name={this.props.name} data-id={this.props.id} contentEditable={isEditing}
//                 // onInput={this.props.handleChange} 
//                 suppressContentEditableWarning={true} spellCheck="false"
//                 onBlur={this.handleUpdate} onKeyUp={this.handleUpdate}
//             >
//                 {this.props.value}
//             </div>
//         )
//     }
// }
