import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import uk from 'date-fns/locale/en-GB';
registerLocale('uk', uk)

export class CellDate extends Component {
    state = {
        startDate: (!this.props.task.timeline[0]) ? Date.now() : new Date(this.props.task.timeline[0]),
        endDate: (!this.props.task.timeline[1]) ? Date.now() : new Date(this.props.task.timeline[1]),
    }
    setDateRange = (update) => {
        const { startDate, endDate } = this.state
        if (!update[1]) return this.setState({ startDate: update[0], endDate: null })
        return this.setState({ ...this.state, endDate: update[1] }, this.onSetTimeline)
    }
    onSetTimeline = () => {
        const { startDate, endDate } = this.state
        const timeline = [startDate, endDate]
        this.props.task.timeline = timeline
        const newBoard = { ...this.props.board }
        this.props.updateBoard(newBoard)
    }
    render() {
        const { startDate, endDate } = this.state
        return (
            <div className="timeline">
                <DatePicker
                    className="date-picker"
                    locale="uk"
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        this.setDateRange(update);
                    }}
                    // isClearable={true}
                />
            </div>
        );
    }
}
