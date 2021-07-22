import React, { useState, useEffect, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { registerLocale, setDefaultLocale } from "react-datepicker";
// import uk from 'date-fns/locale/en-GB';
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService';
import { userService } from '../../services/userService';

// registerLocale('uk', uk)

export const CellDate = (props) => {
    const { task, group, board, updateBoard } = props
    const [startDate, setStartDate] = useState((!task.timeline[0]) ? null : new Date(task.timeline[0]))
    const [endDate, setEndDate] = useState((!task.timeline[1]) ? null : new Date(task.timeline[1]))
    const [isDateSet, setIsDateSet] = useState(false)
    const [isSettingDate, setIsSettingDate] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const { bgColor } = group.style
    const firstUpdate = useRef(true);

    useEffect(() => {
        setIsDateSet((!task.timeline[0] && !task.timeline[1]) ? false : true)
        return () => {
            firstUpdate.current = true
        }
            //  eslint-disable-next-line
    }, [])
   
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        } 
        if (!endDate) return
        onSetTimeline()
            //  eslint-disable-next-line
    }, [endDate])
    
    const setDateRange = (newRange) => {
        if (!newRange[1]) {
            setStartDate(newRange[0])
            setEndDate(null)
            setIsSettingDate(true)
            return
        }
        setEndDate(newRange[1])
    }

    const onSetTimeline = async () => {
        const timeline = [startDate, endDate]
        task.timeline = timeline
        const newBoard = { ...board }
        const newActivity = {
            id: utilService.makeId(),
            type: 'Timeline changed',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: task.id,
                title: task.title,
                changedItem: `${`${startDate}`.substring(4, 10)}-${`${endDate}`.substring(4, 10)}`
            },
            group: {
                id: group.id,
                title: group.title
            }
        }
        newBoard.activities.unshift(newActivity)
        await socketService.emit('board updated', newBoard._id);
        setIsDateSet(true)
        setIsSettingDate(false)
        updateBoard(newBoard)
    }
    const onEnter = () => {
        setIsHover(true)
    }
    const onLeave = () => {
        setIsHover(false)
    }
    const onSetDates = () => {
        setIsSettingDate(true)
    }

    const getNumOfDays = () => {
        if (!startDate || !endDate) return
        const timestampStart = startDate.getTime()
        const timestampEnd = endDate.getTime()
        const totalDays = (timestampEnd - timestampStart) / 1000 / 60 / 60 / 24
        return totalDays
    }
    const getPercent = () => {
        const now = Date.now()
        const timestampStart = startDate.getTime()
        const totalDays = getNumOfDays()
        let milliPassed = now - timestampStart
        const daysPassed = Math.floor(milliPassed / 1000 / 60 / 60 / 24)
        let percent = daysPassed / totalDays * 100
        if (percent < 0) percent = 0
        if (percent > 100) percent = 100
        return percent
    }
    return (
        <div className="timeline" onMouseEnter={onEnter} onMouseLeave={onLeave}>

            {!isDateSet && !isSettingDate && !isHover &&
                <span className="no-date">-</span>}

            {!isDateSet && !isSettingDate && isHover &&
                <span className="set-dates" onClick={onSetDates}>Set Dates</span>}

            {!isDateSet && isSettingDate && <DatePicker
                popperPlacement="bottom"
                className="date-picker-cmp"
                // locale="uk"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setDateRange(update);
                }}
            />}

            {isDateSet && !isSettingDate && isHover &&
                <span className="num-of-days" onClick={() => setIsHover(false) }>{getNumOfDays()} d</span>}

            {isDateSet && !isHover &&
                <div className="date-pick-wrapper">
                    <div className="date-picker-container">
                        <div className="progress-bar"
                            style={{ backgroundColor: bgColor, width: `${getPercent()}%` }}>
                        </div>
                        <div className="grey-bck"></div>
                        <DatePicker
                            className="date-picker-cmp"
                            popperPlacement="bottom"
                            popperClassName="date-picker-pos"
                            // dateFormat="us"
                            // locale="uk"
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update);
                            }}
                        />
                    </div>
                </div>}
        </div>
    );
}
