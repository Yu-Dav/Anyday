import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';



const getCharOptions = (groups) => {
    const objs = {}

    groups.forEach(group => {
        group.tasks.forEach(task => {

            //each title should be in a diff array
            objs[task.status.title] = ++objs[task.status.title] || 1
            // objs.push( ++objs[task.status.title] || 1)
        });
    });
    const propertyValues = Object.values(objs);


    const options = {
        chart: {
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        series: [
            { 
                data: propertyValues
            }
        ]
    };
    return options;
};


export const DashBoard = ({ groups }) => {

    const y = getCharOptions(groups);

    console.log('cc', y);
    return (
        <HighchartsReact highcharts={Highcharts} options={y} data={y} />
    )
}
