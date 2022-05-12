import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const prepareData = (groups) => {
    const colors = []
    const monthsSum = {};
    const statusSum = groups.reduce((acc, group) => {
        group.tasks.forEach(task => {
            const startMonth = new Date(task.timeline[0]).getMonth();
            const endMonth = new Date(task.timeline[1]).getMonth();
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
    return { statusSum, colors, monthsSum }
}

const chartOptions = (data, type, colors) => {
    const isBar = type === 'bar';

    const statusArr = [];
    const monthArr = Array(12).fill(0);
    for (const [key, value] of Object.entries(data)) {
        if (isBar) {
            monthArr[key] = value
        } else {
            const keyName = key === '.' ? 'no status' : key
            statusArr.push({ 'name': keyName, 'y': value, color: colors[key] });
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
        yAxis: {
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
    const { statusSum, monthsSum, colors } = prepareData(groups);
    const pieOptions = chartOptions(statusSum, 'pie', colors);
    const lineOptions = chartOptions(monthsSum, 'bar')
    console.log({ statusSum, monthsSum });

    return (
        <div className='flex justify-center'>
            <HighchartsReact highcharts={Highcharts} options={pieOptions} />
            <HighchartsReact highcharts={Highcharts} options={lineOptions} />
        </div>
    )
}