import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import uk from 'date-fns/locale/en-GB';
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
        this.props.updateBoard(newBoard)
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
        const difInDays = (timestampEnd - timestampStart) / 1000 / 60 / 60 / 24
        return difInDays
    }
    
    render() {

        const { startDate, endDate, isHover, isDateSet, isDateSetting } = this.state
        return (
            <div className="timeline" onMouseEnter={this.onEnter} onMouseLeave={this.onLeave}>


                {isDateSet && isHover &&
                    <div>{this.getNumOfDays()} d</div>
                }
                {isDateSet && !isHover &&
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
                    <div onClick={this.onSetDates}>Set Dates</div>
                }
                {!isDateSet && !isDateSetting &&
                    <div >-</div>
                }

            </div>
        );
    }
}
