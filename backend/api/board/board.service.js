const dbService = require('../../services/db.service');
const utilService = require('../../services/util.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

async function query() {
    try {
        const collection = await dbService.getCollection('board_db');
        var boards = await collection.find().toArray();
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
        console.log('filtered- line 311111111111111111111111', objBoard);
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

async function add(currUser) {
    try {
        const boardToAdd = _createNewBoard(currUser);
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

// await db.collection('inventory').insertMany([
//     {
//       item: 'journal',
//       qty: 25,
//       tags: ['blank', 'red'],
//       dim_cm: [14, 21]
//     },
// const cursor = db.collection('inventory').find(
//  the criteria:::
//{
//     tags: ['red', 'blank']
//   });

// const cursor = db.collection('inventory').find({
//     instock: { warehouse: 'A', qty: 5 }
//   });

function _buildCriteria(filterBy) {
    console.log(`file: board.service.js || line 99 || filterBy`, filterBy);
    const criteria = {
        groups: {
            tasks: {
                tags: [],
                priority: {},
                status: {},
            },
        },
    };
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
        // criteria.priority= filterBy.priority;
        criteria.groups.tasks.priority = filterBy.priority;
    }
    if (filterBy.status) {
        criteria.status = filterBy.status;
    }
    if (filterBy.tag) {
        criteria.tag = filterBy.tag;
    }
    // criteria.isFavorite = true;
    // const subtitle = { $regex: 'mo', $options: 'i' };
    // console.log(`file: board.service.js || line 130 || criteria`, criteria.subtitle);
    console.log('crit 143((((( :::::::', criteria);
    return criteria;
}

function _createNewBoard(currUser) {
    return {
        title: 'Your new Board meow',
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
        members: [currUser], /// can't add more members!!
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
                        status: {
                            id: 'sl2',
                            title: 'Working on it',
                            color: '#fdab3d',
                        },
                        priority: { id: 'pl4', title: '', color: '#c4c4c4' },
                        members: [currUser],
                        comments: [
                            {
                                id: utilService.makeId(),
                                txt: 'Added new group',
                                createdAt: Date.now(),
                                byMember: currUser,
                                taskId: 'g3t101',
                                // groupId: 'g103',
                            },
                        ],
                        byMember: currUser,
                    },
                ],
            },
            {
                id: utilService.makeId(),
                style: { bgColor: '#00c875' },
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
                        status: {
                            id: 'sl2',
                            title: 'Working on it',
                            color: '#fdab3d',
                        },
                        priority: { id: 'pl4', title: '', color: '#c4c4c4' },
                        members: [currUser],
                        comments: [
                            {
                                id: utilService.makeId(),
                                txt: 'Added new group',
                                createdAt: Date.now(),
                                byMember: currUser,
                                taskId: 'g3t101',
                                // groupId: 'g103',
                            },
                        ],
                        byMember: currUser,
                    },
                ],
            },
            {
                id: utilService.makeId(),
                style: { bgColor: '#ff642e' },
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
                        status: {
                            id: 'sl2',
                            title: 'Working on it',
                            color: '#fdab3d',
                        },
                        priority: { id: 'pl4', title: '', color: '#c4c4c4' },
                        members: [currUser],
                        comments: [
                            {
                                id: utilService.makeId(),
                                txt: 'Added new group',
                                createdAt: Date.now(),
                                byMember: currUser,
                                taskId: 'g3t101',
                                // groupId: 'g103',
                            },
                        ],
                        byMember: currUser,
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
        createdBy: currUser,
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
