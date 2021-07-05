import React, { Component } from 'react'

export class EditableCmp extends Component {

    state = {
        // txt: this.props.value,
        isEditing: true
    }


    handleUpdate = (ev) => {
        if (ev.key === 'Enter' || ev.type === 'blur'){
            this.setState({isEditing: false}, ()=> this.props.updateFunc(ev))
        } 
        setTimeout(() => {
            this.setState({ isEditing: true })
        }, 500)
    }

    render() {
        const { isEditing } = this.state
        return (
            <div className={`editable-cmp ${this.props.className}`} style={this.props.style} data-name={this.props.name} data-id={this.props.id} contentEditable={isEditing}
                // onInput={this.props.handleChange} 
                suppressContentEditableWarning={true} spellCheck="false"
                onBlur={this.handleUpdate} onKeyUp={this.handleUpdate}
            >
                {this.props.value}
            </div>
        )
    }
}
