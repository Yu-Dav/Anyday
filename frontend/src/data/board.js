import { utilService } from '../services/utilService'
import { user } from './user'

function getTime() {
    return Date.now() -
        utilService.getRandomInt(
            1000 * 60 * 60 * 24 * 5,
            1000 * 60 * 60 * 24 * 10
        );
}
export const boards = [
    {
        _id: 'b101',
        title: 'Final Sprint',
        subtitle: 'Our monday',
        createdAt: getTime(),
        description:
            'Planning the final sprint and assigning tasks between team members',
        isFavorite: false,

        createdBy: {
            _id: 'u102',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
        },

        tags: [
            // empty array at first, then once adding a label in a task it will be updated here and will
            //  be selectable in other tasks/groups
            {
                id: 't101',
                title: '#starting',
                color: '#61bd4f',
            },
            {
                id: 't102',
                title: '#problem',
                color: '#e2445c',
            },
            {
                id: 't103',
                title: '#development',
                color: '#579bfc',
            },
            {
                id: 't104',
                title: '#production',
                color: '#a25ddc',
            },
        ],

        priorityLabels: [
            {
                id: 'pl1',
                title: 'High',
                color: '#e2445c',
            },
            {
                id: 'pl2',
                title: 'Medium',
                color: '#a25ddc',
            },
            {
                id: 'pl3',
                title: 'Low',
                color: '#579bfc',
            },
            {
                id: 'pl4',
                title: '',
                color: '#c4c4c4',
            },
        ],

        statusLabels: [
            {
                id: 'sl1',
                title: 'Done',
                color: '#00c875',
            },
            {
                id: 'sl2',
                title: 'Working on it',
                color: '#fdab3d',
            },
            {
                id: 'sl3',
                title: 'Stuck',
                color: '#ff642e',
            },
            {
                id: 'sl4',
                title: 'On hold',
                color: '#175a63',
            },
            {
                id: 'sl5',
                title: '',
                color: '#c4c4c4',
            },
        ],

        members: user,
        groups: [
            {
                id: 'g101',
                style: { bgColor: '#26de81' },
                title: 'Features',
                tasks: [
                    {
                        id: 'g1t101',
                        labelIds: ['101'],
                        createdAt: getTime(),
                        timeline: [null, null],
                        title: 'Content Editable',
                        tags: [
                            {
                                id: 't101',
                                title: '#starting',
                                color: '#61bd4f',
                            },
                        ],
                        status: {
                            id: 'sl1',
                            title: 'Done',
                            color: '#00c875',
                        },
                        priority: {
                            id: 'pl1',
                            title: 'High',
                            color: '#e2445c',
                        },
                        members: [
                            // TASK members
                            {
                                _id: 'u101',
                                username: 'Dafna',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        comments: [
                            {
                                // popup modal on the side of the screen showing the comments each member left
                                id: 'ZdPnm',
                                txt: 'also @yaronb please CR this',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Tal Tarablus',
                                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                        ],
                        byMember: {
                            _id: 'u101',
                            username: 'Dafna',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    },
                    {
                        id: 'g1t102',
                        labelIds: ['101'],
                        createdAt: getTime(),
                        timeline: [null, null],
                        title: 'Date Range Picker',
                        tags: [
                            {
                                id: 't101',
                                title: '#starting',
                                color: '#61bd4f',
                            },
                        ],
                        status: {
                            id: 'sl4',
                            title: 'On hold',
                            color: '#175a63',
                        },
                        priority: {
                            id: 'pl3',
                            title: 'Low',
                            color: '#579bfc',
                        },
                        members: [
                            // TASK members
                            {
                                _id: 'u101',
                                username: 'Yuval',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        comments: [
                            {
                                // popup modal on the side of the screen showing the comments each member left
                                id: 'ZdPnm',
                                txt: 'also @yaronb please CR this',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Tal Tarablus',
                                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                        ],
                        byMember: {
                            _id: 'u101',
                            username: 'Yuval',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    },
                    {
                        id: 'g1t103',
                        labelIds: ['101'],
                        createdAt: getTime(),
                        timeline: [null, null],
                        title: 'Drag and Drop',
                        tags: [
                            {
                                id: 't103',
                                title: '#development',
                                color: '#61bd4f',
                            },
                        ],
                        status: {
                            id: 'sl2',
                            title: 'Working on it',
                            color: '#fdab3d',
                        },
                        priority: {
                            id: 'pl2',
                            title: 'Medium',
                            color: '#a25ddc',
                        },
                        members: [
                            // TASK members
                            {
                                _id: 'u101',
                                username: 'Yuval',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        comments: [
                            {
                                // popup modal on the side of the screen showing the comments each member left
                                id: 'ZdPnm',
                                txt: 'also @yaronb please CR this',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Tal Tarablus',
                                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                        ],
                        byMember: {
                            _id: 'u101',
                            username: 'Yuval',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    },
                ],
            },
            {
                id: 'g102',
                style: { bgColor: '#bb3354' },
                title: 'UX/UI',
                tasks: [
                    {
                        id: 'g2t101',
                        labelIds: ['101'],
                        createdAt: getTime(),
                        timeline: [null, null],
                        title: 'App flow - from home page to boards to selected boards',
                        tags: [
                            {
                                id: 't101',
                                title: '#starting',
                                color: '#61bd4f',
                            },
                        ],
                        status: {
                            id: 'sl2',
                            title: 'Working on it',
                            color: '#fdab3d',
                        },
                        priority: {
                            id: 'pl2',
                            title: 'Medium',
                            color: '#a25ddc',
                        },
                        members: [
                            // TASK members
                            {
                                _id: 'u101',
                                username: 'Noga, Dafna, Yuval',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        comments: [
                            {
                                // popup modal on the side of the screen showing the comments each member left
                                id: 'ZdPnm',
                                txt: 'also @yaronb please CR this',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Tal Tarablus',
                                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                        ],
                        byMember: {
                            _id: 'u101',
                            username: 'Noga',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    },
                    {
                        id: 'g2t102',
                        labelIds: ['101'],
                        createdAt: getTime(),
                        timeline: [null, null],
                        title: 'Popup modals and Material UI drawer',
                        tags: [
                            {
                                id: 't101',
                                title: '#starting',
                                color: '#61bd4f',
                            },
                        ],
                        status: {
                            id: 'sl2',
                            title: 'Working on it',
                            color: '#fdab3d',
                        },
                        priority: {
                            id: 'pl1',
                            title: 'High',
                            color: '#e2445c',
                        },
                        members: [
                            // TASK members
                            {
                                _id: 'u101',
                                username: 'Noga, Dafna',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        comments: [
                            {
                                // popup modal on the side of the screen showing the comments each member left
                                id: 'ZdPnm',
                                txt: 'also @yaronb please CR this',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Tal Tarablus',
                                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                        ],
                        byMember: {
                            _id: 'u101',
                            username: 'Yuval',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    },
                    {
                        id: 'g2t103',
                        labelIds: ['101'],
                        createdAt: getTime(),
                        timeline: [null, null],
                        title: 'Add CSS transition/React animations when components changes',
                        tags: [
                            {
                                id: 't101',
                                title: '#starting',
                                color: '#61bd4f',
                            },
                        ],
                        status: {
                            id: 'sl2',
                            title: 'Working on it',
                            color: '#fdab3d',
                        },
                        priority: {
                            id: 'pl3',
                            title: 'Low',
                            color: '#579bfc',
                        },
                        members: [
                            // TASK members
                            {
                                _id: 'u101',
                                username: 'Yuval',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        comments: [
                            {
                                // popup modal on the side of the screen showing the comments each member left
                                id: 'ZdPnm',
                                txt: 'also @yaronb please CR this',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Tal Tarablus',
                                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                        ],
                        byMember: {
                            _id: 'u101',
                            username: 'Yuval',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    },
                ],
            },
            {
                id: 'g103',
                style: { bgColor: '#784bd1' },
                title: 'Pre Operation',
                tasks: [
                    {
                        id: 'g3t101',
                        labelIds: ['101'],
                        createdAt: getTime(),
                        timeline: [null, null],
                        title: 'git + initial files setup + initial push/pull',
                        tags: [
                            {
                                id: 't101',
                                title: '#starting',
                                color: '#61bd4f',
                            },
                        ],
                        status: {
                            id: 'sl1',
                            title: 'Done',
                            color: '#00c875',
                        },
                        priority: {
                            id: 'pl4',
                            title: '',
                            color: '#c4c4c4',
                        },
                        members: [
                            // TASK members
                            {
                                _id: 'u101',
                                username: 'Dafna, Noga, Yuval',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        comments: [
                            {
                                // popup modal on the side of the screen showing the comments each member left
                                id: 'ZdPnm',
                                txt: 'also @yaronb please CR this',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Tal Tarablus',
                                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                        ],
                        byMember: {
                            _id: 'u101',
                            username: 'Noga',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    },
                ],
            },
        ],
        activities: [
            // all activities at the top of the display, then again filtered for each task
            {
                id: 'a101',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u102',
                    fullname: 'Abi Abambi',
                    imgUrl: 'http://some-img',
                },
                task: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
        ],
    },
];
