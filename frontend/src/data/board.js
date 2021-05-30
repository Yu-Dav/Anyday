import { utilService } from '../services/utilService'
import {user} from './user'

const getTime = Date.now()-utilService.getRandomInt(1000*60*60*24*5,1000*60*60*24*10)

export const boards = [
    {
        _id: 'b101',
        title: 'Final Sprint',
        subtitle: 'Our monday',
        createdAt: getTime,
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
                id: 'l101',
                title: '#starting',
                color: '#61bd4f',
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
                        createdAt: getTime,
                        dueDate: 16156215211,
                        title: 'Content Editable',
                        tags: ['initialize'],
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
                        createdAt: getTime,
                        dueDate: 16156215211,
                        title: 'Date Range Picker',
                        tags: ['initialize'],
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
                        createdAt: getTime,
                        dueDate: 16156215211,
                        title: 'Drag and Drop',
                        tags: ['initialize'],
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
                style: { bgColor: '#26de81' },
                title: 'UX/UI',
                tasks: [
                    {
                        id: 'g2t101',
                        labelIds: ['101'],
                        createdAt: getTime,
                        dueDate: 16156215211,
                        title: 'App flow - from home page to boards to selected boards',
                        tags: ['initialize'],
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
                        createdAt: getTime,
                        dueDate: 16156215211,
                        title: 'Popup modals and Material UI drawer',
                        tags: ['initialize'],
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
                        createdAt: getTime,
                        dueDate: 16156215211,
                        title: 'Add CSS transition/React animations when components changes',
                        tags: ['initialize'],
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
                style: { bgColor: '#26de81' },
                title: 'Pre Operation',
                tasks: [
                    {
                        id: 'g3t101',
                        labelIds: ['101'],
                        createdAt: getTime,
                        dueDate: 16156215211,
                        title: 'git + initial files setup + initial push/pull',
                        tags: ['done'],
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
