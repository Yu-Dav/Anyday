import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import uk from 'date-fns/locale/en-GB';
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService';
import { userService } from '../../services/userService';

registerLocale('uk', uk)

export class CellDate extends Component {
    state = {
        startDate: (!this.props.task.timeline[0]) ? null : new Date(this.props.task.timeline[0]),
        endDate: (!this.props.task.timeline[1]) ? null : new Date(this.props.task.timeline[1]),
        isDateSet: '',
        isSettingDate: false,
        isHover: false,
    }
    componentDidMount() {
        this.setState({
            ...this.state, isDateSet: (!this.props.task.timeline[0] && !this.props.task.timeline[1]) ? false : true,
        })
    }
    setDateRange = (update) => {
        if (!update[1]) return this.setState({ startDate: update[0], endDate: null, isSettingDate: true })
        return this.setState({ ...this.state, endDate: update[1] },
            this.onSetTimeline)
    }
    onSetTimeline = async () => {
        const { startDate, endDate } = this.state
        const timeline = [startDate, endDate]
        this.props.task.timeline = timeline
        const newBoard = { ...this.props.board }
        const newActivity = {
            id: utilService.makeId(),
            type: 'Timeline changed',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: this.props.task.id,
                title: this.props.task.title,
                changedItem: `${`${startDate}`.substring(4, 10)}-${`${endDate}`.substring(4, 10)}`
            },
            group: {
                id: this.props.group.id,
                title: this.props.group.title
            }
        }
        newBoard.activities.unshift(newActivity)
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
        if (!startDate || !endDate) return
        const timestampStart = startDate.getTime()
        const timestampEnd = endDate.getTime()
        const totalDays = (timestampEnd - timestampStart) / 1000 / 60 / 60 / 24
        return totalDays
    }
    getPercent = () => {
        const { startDate } = this.state
        const now = Date.now()
        const timestampStart = startDate.getTime()
        const totalDays = this.getNumOfDays()
        let milliPassed = now - timestampStart
        const daysPassed = Math.floor(milliPassed / 1000 / 60 / 60 / 24)
        let percent = daysPassed / totalDays * 100
        if (percent < 0) percent = 0
        if (percent > 100) percent = 100
        return percent
    }
    render() {
        const { bgColor } = this.props.group.style
        const { isHover, isDateSet, isSettingDate } = this.state
        return (
            <div className="timeline" onMouseEnter={this.onEnter} onMouseLeave={this.onLeave}>

                {!isDateSet && !isSettingDate && !isHover &&
                    <span className="no-date">-</span>}

                {!isDateSet && !isSettingDate && isHover &&
                    <span className="set-dates" onClick={this.onSetDates}>Set Dates</span>}

                {!isDateSet && isSettingDate && <DatePicker
                    className="date-picker-cmp"
                    locale="uk"
                    selectsRange={true}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={(update) => {
                        this.setDateRange(update);
                    }}
                />}

                {isDateSet && !isSettingDate && isHover &&
                    <span className="num-of-days" onClick={() => this.setState({ ...this.state, isHover: false, })}>{this.getNumOfDays()} d</span>}

                {isDateSet && !isHover &&
                    <div className="date-pick-wrapper">
                        <div className="date-picker-container">
                            <div className="progress-bar"
                                style={{ backgroundColor: bgColor, width: `${this.getPercent()}%` }}>
                            </div>
                            <div className="grey-bck"></div>
                            <DatePicker
                                className="date-picker-cmp"
                                locale="uk"
                                selectsRange={true}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={(update) => {
                                    this.setDateRange(update);
                                }}
                            />
                        </div>
                    </div>}

            </div>
        );
    }
}
