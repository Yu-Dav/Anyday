import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import uk from 'date-fns/locale/en-GB';
import { yellow } from '@material-ui/core/colors';
registerLocale('uk', uk)

export class CellDate extends Component {
    state = {
        startDate: (!this.props.task.timeline[0]) ? null : new Date(this.props.task.timeline[0]),
        endDate: (!this.props.task.timeline[1]) ? null : new Date(this.props.task.timeline[1]),
        isDateSet: '',
        isHover: false,
        isDateSetting: false,

    }
    componentDidMount() {
        this.setState({
            ...this.state, isDateSet: (!this.props.task.timeline[0] && !this.props.task.timeline[1]) ? false : true,
        })
    }

    setDateRange = (update) => {
        // const { startDate, endDate } = this.state
        if (!update[1]) return this.setState({ startDate: update[0], endDate: null })
        return this.setState({ ...this.state, endDate: update[1] },
            this.onSetTimeline)
    }
    onSetTimeline = () => {
        const { startDate, endDate } = this.state
        const timeline = [startDate, endDate]
        this.props.task.timeline = timeline
        const newBoard = { ...this.props.board }
        this.setState({ ...this.state, isDateSet: true, isDateSetting: false }, () => this.props.updateBoard(newBoard))

    }
    onEnter = () => {
        this.setState({ ...this.state, isHover: true })
    }
    onLeave = () => {
        this.setState({ ...this.state, isHover: false })
    }
    onSetDates = () => {
        this.setState({ ...this.state, isDateSetting: true })
    }
    getNumOfDays = () => {
        const { startDate, endDate } = this.state
        const timestampStart = startDate.getTime()
        const timestampEnd = endDate.getTime()


        // const totalTimestamp =(timestampEnd - timestampStart)
        // const diffTimestamp = totalTimestamp-now
        // const precentProgress = diffTimestamp/totalTimestamp/100



        const totalDays = (timestampEnd - timestampStart) / 1000 / 60 / 60 / 24



        return totalDays
    }

    getPrecents = () => {
        const { startDate, endDate } = this.state
        const now = Date.now()
        const timestampStart = startDate.getTime()
        const timestampEnd = endDate.getTime()
        const totalDays = (timestampEnd - timestampStart) / 1000 / 60 / 60 / 24
        let milliPassed = now - timestampStart
        const daysPassed = Math.floor(milliPassed / 1000 / 60 / 60 / 24)
        let percent = daysPassed / totalDays * 100
        console.log('percent', percent);
        if (percent < 0) percent = 0
        if (percent > 100) percent = 100
        return percent

    }

    render() {

        const { startDate, endDate, isHover, isDateSet, isDateSetting } = this.state
        return (
            <div className="timeline" onMouseEnter={this.onEnter} onMouseLeave={this.onLeave}>


                {isDateSet && isHover &&
                    <span className="num-of-days">{this.getNumOfDays()} d</span>
                }
                {isDateSet && !isHover &&
                    <React.Fragment>
                        <span className="date-picker" style={{backgroundColor:"pink", width:`${this.getPrecents()}`}}>
                        <DatePicker
                            className="date-picker-cmp"
                            locale="uk"
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                this.setDateRange(update);
                            }}
                        />
                        </span>
                        <div className="progress-bar">
                            <span className="precents">{this.getPrecents()}</span>
                        </div>
                    </React.Fragment>

                }
                {isDateSetting &&
                    <DatePicker
                        className="date-picker"
                        locale="uk"
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            this.setDateRange(update);
                        }}
                    />
                }
                {!isDateSet && isHover &&
                    <span className="set-dates" onClick={this.onSetDates}>Set Dates</span>
                }
                {!isDateSet && !isDateSetting &&
                    <span className="no-date">-</span>
                }

            </div>
        );
    }
}


// #myProgress {
//     width: 100%;
//     background-color: #ddd;
//   }
  
// #myBar {
//     width: 10%;
//     height: 30px;
//     background-color: #04AA6D;
//     text-align: center;
//     line-height: 30px;
//     color: white;
//   }
//   </style>
//   <body>
  
 
  
//   <div id="myProgress">
//     <div id="myBar">10%</div>
//   </div>
  
//   <br>
//   <button onclick="move()">Click Me</button> 
  
//   <script>
//   var i = 0;
//   function move() {
//     if (i == 0) {
//       i = 1;
//       var elem = document.getElementById("myBar");
//       var width = 10;
//       var id = setInterval(frame, 10);
//       function frame() {
//         if (width >= 100) {
//           clearInterval(id);
//           i = 0;
//         } else {
//           width++;
//           elem.style.width = width + "%";
//           elem.innerHTML = width  + "%";
//         }
//       }
//     }
//   }