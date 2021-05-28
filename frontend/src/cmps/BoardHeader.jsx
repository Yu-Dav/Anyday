import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import { EditableCmp } from './EditableCmp'

export class BoardHeader extends Component {
    state = {
        title: this.props.board.title,
        subtitle: this.props.board.subtitle
    }

    componentDidMount() {
        // this.setState({ title: 'Hello world', subTitle: 'im here!' })
        console.log(this.state);
    }

    // constructor() {
    //     super()
    //     this.contentEditable = React.createRef();
    //     this.contentEditable2 = React.createRef();
    //     this.state = { boardTitle: 'Hello world', subTitle: 'im here!' };
    // };

    // handleChange = (ev) => {
    //     this.setState({ boardTitle: ev.target.value });
    // };

    handleChange = ({ target }) => {
        console.log(this.state);
        const { name } = target.dataset
        console.log(name);
        const value = target.innerText
        this.setState({ ...this.state, [name]: value })
    }



    render = () => {
        console.log('board',this.props.board);
        return (

            <div className="board-header">
                <div className="title flex">
                    <EditableCmp className="full" name="title" value={this.state.title} handleChange={this.handleChange} />
                    <button>Last seen</button>
                    <button>Invite / 3</button>
                    <button>Activity</button>
                </div>
                <div className="subtitle">
                    <EditableCmp name="subTitle" value={this.state.subtitle} handleChange={this.handleChange} />
                </div>
                {/* <ContentEditable className="board-title"
            //         data-name="boardTitle"
            //         innerRef={this.contentEditable}
            //         html={this.state.boardTitle} // innerHTML of the editable div
            //         disabled={false}       // use true to disable editing
            //         onChange={this.handleChange} // handle innerHTML change
            //         tagName='div' // Use a custom HTML tag (uses a div by default)
            //         style={{ width: 300 }}
            //     />

            //     <ContentEditable className="board-subtitle"
            //         data-name="subTitle"
            //         innerRef={this.contentEditable2}
            //         html={this.state.subTitle} // innerHTML of the editable div
            //         disabled={false}       // use true to disable editing
            //         onChange={this.handleChange} // handle innerHTML change
            //         tagName='div' // Use a custom HTML tag (uses a div by default)
            //         style={{ width: 300 }}
            //     />

            //     <div data-name="subTitle" contentEditable={true} suppressContentEditableWarning={true}  value={this.state.subTitle} onInput={this.handleChange} onChange={this.handleChange}>
               
            //     </div> */}
            </div>
        )
    }
}

