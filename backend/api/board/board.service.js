const dbService = require('../../services/db.service');
const utilService = require('../../services/util.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('board_db');
        var boards = await collection.find().toArray();
        boards = boards.map((board) => {
            board.createdAt = ObjectId(board._id).getTimestamp();
            // Returning fake fresh data
            // board.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return board;
        });
        return boards;
    } catch (err) {
        logger.error('cannot find boards', err);
        throw err;
    }
}
async function getById(boardId, filterBy) {
    console.log(`file: board.service.js || line 23 || filterBy`, filterBy);
    const criteria = _buildCriteria(filterBy);
    try {
        const collection = await dbService.getCollection('board_db');
        const board = await collection.findOne({ _id: ObjectId(boardId) });
        if (Object.keys(filterBy).length === 0) return board;
        const filteredBoard = await collection.find(criteria).toArray();
        const objBoard = { ...filteredBoard };
        return objBoard[0];
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err);
        throw err;
    }
}

async function update(board) {
    try {
        const boardToSave = {
            _id: ObjectId(board._id),
            title: board.title,
            subtitle: board.subtitle,
            description: board.description,
            isFavorite: board.isFavorite,
            statusLabels: board.statusLabels,
            members: board.members,
            groups: board.groups,
            colors: board.colors,
            createdBy: board.createdBy,
            createdAt: board.createdAt,
            priorityLabels: board.priorityLabels,
            activities: board.activities,
            tags: board.tags,
        };
        const collection = await dbService.getCollection('board_db');
        await collection.updateOne(
            { _id: boardToSave._id },
            { $set: boardToSave }
        );
        return boardToSave;
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err);
        throw err;
    }
}

async function add(req) {
    console.log(`file: board.service.js || line 70 || req`, req)
    try {
        const boardToAdd = _createNewBoard();
        const collection = await dbService.getCollection('board_db');
        await collection.insertOne(boardToAdd);
        return boardToAdd;
    } catch (err) {
        logger.error('cannot insert board', err);
        throw err;
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board_db');
        await collection.deleteOne({ _id: ObjectId(boardId) });
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err);
        throw err;
    }
}

module.exports = {
    query,
    add,
    getById,
    remove,
    update,
};

function _buildCriteria(filterBy) {
    console.log(`file: board.service.js || line 99 || filterBy`, filterBy);
    const criteria = {};
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' };
        criteria.$or = [
            {
                username: txtCriteria,
            },
            {
                fullname: txtCriteria,
            },
        ];
    }
    if (filterBy.priority) {
        console.log(' 117 * * * * * * * * * * in priority');
        // criteria.priority = { $eq: filterBy.priority };
        criteria.groups.tasks.priority.title = filterBy.priority[0].title;
    }
    if (filterBy.status) {
        console.log(' 122 * * * * * * * * * * in status');

        // criteria.status = { $eq: filterBy.status };
        criteria.status = filterBy.status.title;
    }
    if (filterBy.tag) {
        console.log(' 128 * * * * * * * * * * in tag');

        // criteria.tag = { $eq: filterBy.tag };
        criteria.tag = filterBy.tag.title;
    }
    // criteria.isFavorite = true;
    const BananaCriteria = { $regex: 'mo', $options: 'i' };
    console.log(`file: board.service.js || line 130 || criteria`, criteria);
    return criteria;
}

function _createNewBoard() {
    return {
        title: 'Your new Board 222',
        subtitle: 'Your new subtitle',
        description: 'Your new description',
        isFavorite: false,
        statusLabels: [
            { id: 'sl1', title: 'Done', color: '#00c875' },
            { id: 'sl2', title: 'Working on it', color: '#fdab3d' },
            { id: 'sl3', title: 'Stuck', color: '#ff642e' },
            { id: 'sl4', title: 'On hold', color: '#175a63' },
            { id: 'sl5', title: '', color: '#c4c4c4' },
        ],
        members: [ // will be logged in user 
            {
                _id: 'u101',
                fullname: 'Noga Jacobi',
                username: 'Noga',
                password: 'noga1234',
                imgUrl: 'https://i.ibb.co/VD7WqLY/noga.jpg',
                mentions: [{ id: 'm101', boardId: 'm101', taskId: 't101' }],
            },
            {
                _id: 'u102',
                fullname: 'Dafna Bashan ',
                username: 'Dafna',
                password: 'dafna1234',
                imgUrl: 'https://i.ibb.co/qMmQnJL/image.jpg',
                mentions: [{ id: 'm101', boardId: 'm101', taskId: 't101' }],
            },
            {
                _id: 'u103',
                fullname: 'Yuval David',
                username: 'Yuval',
                password: 'yuval1234',
                imgUrl: 'https://i.ibb.co/GFbDjJx/yuval.jpg',
                mentions: [{ id: 'm101', boardId: 'm101', taskId: 't101' }],
            },
            {
                _id: 'u104',
                fullname: 'Basya Coding',
                username: 'Basya',
                password: 'basya1234',
                imgUrl: 'https://i.ibb.co/H2SxZc2/basya.jpg',
                mentions: [{ id: 'm101', boardId: 'm101', taskId: 't101' }],
            },
        ],
        groups: [
            {
                id: utilService.makeId(),
                style: { bgColor: '#784bd1' },
                title: 'Your new group',
                tasks: [
                    {
                        id: utilService.makeId(),
                        labelIds: ['101'],
                        createdAt: Date.now(),
                        timeline: [null, null],
                        title: 'Your new task',
                        tags: [
                            {
                                id: 't101',
                                title: '#starting',
                                color: '#61bd4f',
                            },
                        ],
                        status: { id: 'sl1', title: 'Done', color: '#00c875' },
                        priority: { id: 'pl4', title: '', color: '#c4c4c4' },
                        members: [
                            {
                                _id: 'u103',
                                fullname: 'Yuval David',
                                username: 'Yuval',
                                imgUrl: 'https://i.ibb.co/GFbDjJx/yuval.jpg',
                            },
                            {
                                _id: 'u104',
                                fullname: 'Basya coding',
                                username: 'Basya',
                                imgUrl: 'https://i.ibb.co/H2SxZc2/basya.jpg',
                            },
                        ],
                        comments: [
                            {
                                id: utilService.makeId(),
                                txt: 'Added new group',
                                createdAt: Date.now(),
                                byMember: {
                                    _id: 'u104',
                                    fullname: 'Basya coding',
                                    username: 'Basya',
                                    imgUrl: 'https://i.ibb.co/H2SxZc2/basya.jpg',
                                },
                                taskId: 'g3t101',
                                // groupId: 'g103',
                            },
                        ],
                        byMember: {
                            _id: 'u104',
                            fullname: 'Basya coding',
                            username: 'Basya',
                            imgUrl: 'https://i.ibb.co/H2SxZc2/basya.jpg',
                        },
                    },
                ],
            },
        ],
        colors: [
            { id: 'c101', name: 'darkGreen', value: '#037f4c' },
            { id: 'c102', name: 'green', value: '#00c875' },
            { id: 'c103', name: 'yellowGreen', value: '#9cd326' },
            { id: 'c104', name: 'beige', value: '#cab641' },
            { id: 'c105', name: 'yellow', value: '#ffcb00' },
            { id: 'c106', name: 'darkPurple', value: '#784bd1' },
            { id: 'c107', name: 'purple', value: '#a25ddc' },
            { id: 'c108', name: 'turquoise', value: '#0086BE' },
            { id: 'c109', name: 'blue', value: '#579bfc' },
            { id: 'c110', name: 'lightBlue', value: '#66ccff' },
            { id: 'c111', name: 'darkRed', value: '#bb3354' },
            { id: 'c112', name: 'red', value: '#e2445c' },
            { id: 'c113', name: 'darkOrange', value: '#ff642e' },
            { id: 'c114', name: 'orange', value: '#fdab3d' },
            { id: 'c115', name: 'brown', value: '#7f5347' },
            { id: 'c116', name: 'grey', value: '#c4c4c4' },
            { id: 'c117', name: 'darkGrey', value: '#808080' },
        ],
        createdBy: null,
        createdAt: Date.now(),
        priorityLabels: [
            { id: 'pl1', title: 'High', color: '#e2445c' },
            { id: 'pl2', title: 'Medium', color: '#a25ddc' },
            { id: 'pl3', title: 'Low', color: '#579bfc' },
            { id: 'pl4', title: '', color: '#c4c4c4' },
        ],
        activities: [],
        tags: [
            { id: 't101', title: '#starting', color: '#61bd4f' },
            { id: 't102', title: '#problem', color: '#e2445c' },
            { id: 't103', title: '#development', color: '#579bfc' },
            { id: 't104', title: '#production', color: '#a25ddc' },
        ],
    };
}
