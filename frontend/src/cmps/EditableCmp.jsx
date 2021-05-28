import React, { Component } from 'react'

export class EditableCmp extends Component {

    state = {
        txt: this.props.value,
        isEditing: true
    }

    // handleChange = (ev) => {
    //     console.log(ev.target);
    //     const {innerText} = ev.target
    //     this.setState({...this.state, txt: innerText})
    // }


    render() {
        const { isEditing, txt } = this.state
        console.log(this.props);
        return (
            <div className={this.props.className} data-name={this.props.name} contentEditable={isEditing} onInput={this.props.handleChange} suppressContentEditableWarning={true}>
                {this.props.value}
            </div>
        )
    }
}
