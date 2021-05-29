import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class CellDate extends Component {
    state = {
        startDate: null,
        endDate: null
    }
    setDateRange = (update) => {
        console.log('update =', update)
        const { startDate, endDate } = this.state
        if (!update[1]) return this.setState({ ...this.state, startDate: update[0] })
        return this.setState({ ...this.state, endDate: update[0] })

    }

    render() {
        const { startDate, endDate } = this.state
        return (
            <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    this.setDateRange(update);
                }}
                isClearable={true}
            />
        );
    }
}
