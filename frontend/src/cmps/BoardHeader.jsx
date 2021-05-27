import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'

export class BoardHeader extends Component {
    state = {
        boardTitle: 'Hello world'
    }

    constructor() {
        super()
        this.contentEditable = React.createRef();
        this.state = { boardTitle: 'Hello world' };
    };

    handleChange = (ev) => {
        this.setState({ boardTitle: ev.target.value });
    };

    render = () => {
        return <ContentEditable
            innerRef={this.contentEditable}
            html={this.state.boardTitle} // innerHTML of the editable div
            disabled={false}       // use true to disable editing
            onChange={this.handleChange} // handle innerHTML change
            tagName='div' // Use a custom HTML tag (uses a div by default)
        />
    };
}
