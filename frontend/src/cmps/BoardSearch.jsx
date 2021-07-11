import React, { useEffect, useState } from 'react'
import { Input } from '@material-ui/core'

export const BoardSearch = (props) => {

    const [txt, setTxt] = useState('')

    useEffect(() => {
        props.filterBoard({ txt })
    }, [txt])
    
    const handleChange = async (ev) => {
        // const field = ev.target.name
        const value = ev.target.value
        setTxt(value)
        // props.filterBoard({ txt })
    }

    return (
        <form className="board-search fade-in">
            <label htmlFor="txt" ></label>
            <Input
                className="board-search" autoComplete="off" type="text" name="txt" id="txt"
                value={txt} placeholder="Enter here" onChange={handleChange}
                autoFocus />
        </form>

    )
}


// export class BoardSearch extends Component {
//     state = { 
//             txt: ''
//     }

//     handleChange = (ev) => {
//         const field = ev.target.name
//         const value = ev.target.value
//         this.setState({ ...this.state, [field]: value }, () => {
//             this.props.filterBoard({...this.state})
//         })
//     }

//     render() {
//         const { txt } = this.state
//         return (
//             <form className="board-search fade-in">
//                 <label htmlFor="txt" ></label>
//                 <Input
//                     className="board-search" autoComplete="off" type="text" name="txt" id="txt"
//                     value={txt} placeholder="Enter here" onChange={this.handleChange}
//                     autoFocus />
//             </form>

//         )
//     }
// }
