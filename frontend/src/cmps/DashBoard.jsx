import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

//todo: move to a different file
const charOptions = (groups, type) => {
    console.log({type});
    const colors = []
    const monthsSum = {};

    const statusSum = groups.reduce((acc, group) => {
        group.tasks.forEach(task => {
            console.log(task, task.timeline[0]);
            //todo = move to a diff func
            // const startMonth = new Date(task.timeline[0]).toLocaleString('default', { month: 'long' });  //reduce code
            // const endMonth = new Date(task.timeline[1]).toLocaleString('default', { month: 'long' });
            const startMonth = new Date(task.timeline[0]).getMonth();
            const endMonth = new Date(task.timeline[1]).getMonth();
            const isSameMonth = startMonth === endMonth;
            monthsSum[startMonth] = ++monthsSum[startMonth] || 1;
            if (!isSameMonth) {
                const diff = endMonth - startMonth
                for (var i = 0; i < diff; i++) {
                    const vvv =   ++ i + startMonth;
                    console.log({ vvv });
                    monthsSum[vvv] = ++monthsSum[vvv] || 1;
                }
            }
            acc[task.status.title] = ++acc[task.status.title] || 1
            colors[task.status.title] = task.status.color;
        });
        return acc
    }, {});
    console.log({ monthsSum });

    //change to reusable
    const arr = [];
    for (const [key, value] of Object.entries(monthsSum)) {
        arr.push({ 'name': key, 'y': value, color: colors[key] });
    }

    const options = {
        chart: {
            type
        },
        title: {
            text: 'status'
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

const lineChartOptions = (groups) => {
    console.log('fff');
}

export const DashBoard = ({ groups }) => {
    const y = charOptions(groups, 'pie');
    const line = charOptions(groups, 'line')

    return (
        <div className='flex justify-center'>
            <HighchartsReact highcharts={Highcharts} options={y} />
            {/* <HighchartsReact highcharts={Highcharts} options={line} /> */}
        </div>
    )
}