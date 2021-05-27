import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'

export class BoardHeader extends Component {
    state = {
        boardTitle: 'Hello world',
        subTitle: 'im here!'
    }

    constructor() {
        super()
        this.contentEditable = React.createRef();
        this.state = { boardTitle: 'Hello world', subTitle: 'im here!' };
    };

    // handleChange = (ev) => {
    //     this.setState({ boardTitle: ev.target.value });
    // };

    handleChange = ({ target }) => {
        const { name } = target
        const value = target.value
        this.setState({ ...this.state, [name]: value })
    }

    render = () => {
        return (
            <div>
                <ContentEditable className="board-title"
                    name="boardTitle"
                    innerRef={this.contentEditable}
                    html={this.state.boardTitle} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleChange} // handle innerHTML change
                    tagName='div' // Use a custom HTML tag (uses a div by default)
                    style={{ width: 300 }}
                />

                {/* <ContentEditable className="board-subtitle"
                    name="subTitle"
                    innerRef={this.contentEditable}
                    html={this.state.subTitle} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleChange} // handle innerHTML change
                    tagName='div' // Use a custom HTML tag (uses a div by default)
                    style={{ width: 300 }}
                /> */}
            </div>
        )
    };
}

