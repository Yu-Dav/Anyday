export const boards = [
    {
        _id: 'b101',
        title: 'Final Sprint',
        createdAt: 1589983468418,
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
                title: 'Done',
                color: '#61bd4f',
            },
        ],

        members: [
            // BOARD members
            {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl: 'https://www.google.com',
            },
        ],

        groups: [
            {
                id: 'g102',
                style: { bgColor: '#26de81' },
                title: 'Group 1',
                tasks: [
                    {
                        id: 'c104',
                        labelIds: ['101'],
                        createdAt: 1590999730348,
                        dueDate: 16156215211,
                        title: 'Help me',
                        tags: ['initialize'],
                        status: 'Working on it',
                        priority: 'Medium',
                        members: [
                            // TASK members
                            {
                                _id: 'u101',
                                username: 'Tal',
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
                            username: 'Tal',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    },
                ],
            },
            {
                id: 'g102',
                style: { bgColor: '#26de81' },
                title: 'Group 1',
                tasks: [
                    {
                        id: 'c104',
                        labelIds: ['101'],
                        createdAt: 1590999730348,
                        dueDate: 16156215211,
                        title: 'Help me',
                        tags: ['initialize'],
                        status: 'Working on it',
                        priority: 'Medium',
                        members: [
                            // TASK members
                            {
                                _id: 'u101',
                                username: 'Tal',
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
                            username: 'Tal',
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
