import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

//todo- colors

const getCharOptions = (groups) => {
    const objs = {}

    groups.forEach(group => {
        group.tasks.forEach(task => {

            //each title should be in a diff array
            objs[task.status.title] = ++objs[task.status.title] || 1
            // objs.push( ++objs[task.status.title] || 1)
        });
    });

    const arr =[];
    for (const [key, value] of Object.entries(objs)) {
       arr.push({'name':key, 'y':value});
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
        <HighchartsReact highcharts={Highcharts} options={y} data={y} />
    )
}
