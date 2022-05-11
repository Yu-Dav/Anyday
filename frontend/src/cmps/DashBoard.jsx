import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';


const getCharOptions = (groups) => {
    const colors = []

    const statusSum = groups.reduce((acc, group) => {
        group.tasks.forEach(task => {
            acc[task.status.title] = ++acc[task.status.title] || 1
            colors[task.status.title] = task.status.color;
        });
        return acc
    }, {});

    const arr = [];
    for (const [key, value] of Object.entries(statusSum)) {
        arr.push({ 'name': key, 'y': value, color: colors[key] });
    }

    const options = {
        chart: {
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        series: [
            {
                data: arr
            }
        ]
    };
    return options;
};


export const DashBoard = ({ groups }) => {

    const y = getCharOptions(groups);

    return (
        <HighchartsReact highcharts={Highcharts} options={y} />
    )
}
