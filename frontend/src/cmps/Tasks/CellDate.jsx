import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import uk from 'date-fns/locale/en-GB';
import { socketService } from '../../services/socketService'
registerLocale('uk', uk)

export class CellDate extends Component {
    state = {
        startDate: (!this.props.task.timeline[0]) ? null : new Date(this.props.task.timeline[0]),
        endDate: (!this.props.task.timeline[1]) ? null : new Date(this.props.task.timeline[1]),
        isDateSet: '',
        isHover: false,
        isSettingDate: false,

    }
    componentDidMount() {
        this.setState({
            ...this.state, isDateSet: (!this.props.task.timeline[0] && !this.props.task.timeline[1]) ? false : true,
        })
    }

    setDateRange = (update) => {
        if (!update[1]) return this.setState({ startDate: update[0], endDate: null })
        return this.setState({ ...this.state, endDate: update[1] },
            this.onSetTimeline)
    }
    onSetTimeline = async () => {
        const { startDate, endDate } = this.state
        const timeline = [startDate, endDate]
        this.props.task.timeline = timeline
        const newBoard = { ...this.props.board }
        await socketService.emit('board updated', newBoard._id);
        this.setState({ ...this.state, isDateSet: true, isSettingDate: false }, () => this.props.updateBoard(newBoard))
    }
    onEnter = () => {
        this.setState({ ...this.state, isHover: true })
    }
    onLeave = () => {
        this.setState({ ...this.state, isHover: false })
    }
    onSetDates = () => {
        this.setState({ ...this.state, isSettingDate: true })
    }
    getNumOfDays = () => {
        const { startDate, endDate } = this.state
        const timestampStart = startDate.getTime()
        const timestampEnd = endDate.getTime()
        const totalDays = (timestampEnd - timestampStart) / 1000 / 60 / 60 / 24
        return totalDays
    }

    getPrecents = () => {
        const { startDate } = this.state
        const now = Date.now()
        const timestampStart = startDate.getTime()
        // const timestampEnd = endDate.getTime()
        // const totalDays = (timestampEnd - timestampStart) / 1000 / 60 / 60 / 24
        const totalDays = this.getNumOfDays()
        let milliPassed = now - timestampStart
        const daysPassed = Math.floor(milliPassed / 1000 / 60 / 60 / 24)
        let percent = daysPassed / totalDays * 100
        if (percent < 0) percent = 0
        if (percent > 100) percent = 100
        return percent
    }
    datePicker = <DatePicker
        className="date-picker-cmp"
        locale="uk"
        selectsRange={true}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        onChange={(update) => {
            this.setDateRange(update);
        }}
    />
    render() {
        const { bgColor } = this.props.group.style
        const { isHover, isDateSet, isSettingDate } = this.state
        return (
            <div className="timeline" onMouseEnter={this.onEnter} onMouseLeave={this.onLeave}>

                {isDateSet && isHover &&
                    <span className="num-of-days">{this.getNumOfDays()} d</span>
                }

                {isDateSet && !isHover &&
                    <div className="date-pick-wrapper">
                        <div className="date-picker-container">
                            <div className="progress-bar"
                                style={{ backgroundColor: bgColor, width: `${this.getPrecents()}%` }}>
                            </div>
                            <div className="grey-bck"></div>
                            {this.datePicker}
                        </div>
                    </div>
                }

                {isSettingDate && this.datePicker}

                {!isDateSet && isHover &&
                    <span className="set-dates" onClick={this.onSetDates}>Set Dates</span>
                }

                {!isDateSet && !isSettingDate &&
                    <span className="no-date">-</span>
                }

            </div>
        );
    }
}
