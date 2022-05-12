import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const charOptions = (groups, type) => {
    const colors = []
    const monthsSum = {};
    const isBar = type === 'bar';

    const statusSum = groups.reduce((acc, group) => {
        group.tasks.forEach(task => {
            const startMonth = new Date(task.timeline[0]).getMonth();
            const endMonth = new Date(task.timeline[1]).getMonth();
            console.log({startMonth});
            const isSameMonth = startMonth === endMonth;
            monthsSum[startMonth] = ++monthsSum[startMonth] || 1;
            if (!isSameMonth) {
                const diff = endMonth - startMonth
                for (var i = 0; i < diff; i++) {
                    const month = ++i + startMonth;
                    monthsSum[month] = ++monthsSum[month] || 1;
                }
            }
            acc[task.status.title] = ++acc[task.status.title] || 1
            colors[task.status.title] = task.status.color;
        });
        return acc
    }, {});

    const statusArr = [];
    const monthArr = Array(12).fill(0);
    for (const [key, value] of Object.entries(isBar ? monthsSum : statusSum)) {
        if (isBar) {
            monthArr[key] = value
        } else {
            statusArr.push({ 'name': key, 'y': value, color: colors[key] });
        }

    }

    const options = {
        chart: {
            type
        },
        title: {
            text: (isBar) ? 'tasks per month' : 'status'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        },
        yAxis:{
            title: 'disable'
        },
        series: [
            {
                data: isBar ? monthArr : statusArr,
                showInLegend: false
            }
        ]
    };
    return options;
};


export const DashBoard = ({ groups }) => {
    const pieOptions = charOptions(groups, 'pie');
    const lineOptions = charOptions(groups, 'bar')

    return (
        <div className='flex justify-center'>
            <HighchartsReact highcharts={Highcharts} options={pieOptions} />
            <HighchartsReact highcharts={Highcharts} options={lineOptions} />
        </div>
    )
}