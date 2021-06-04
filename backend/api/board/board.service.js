const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('board_db');
        var boards = await collection.find(criteria).toArray();
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
        console.log('filtered- line 311111111111111111111111', objBoard)
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

async function add(board) {
    try {
        // peek only updatable fields!
        const boardToAdd = {
            // title: board.test,
            // add all the rest to be added
        };
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
    const criteria = { groups:{
        tasks:{
            tags:[],
            priority:{},
            status:{}
        }
    }};
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
        criteria.groups.tasks.priority = filterBy.priority
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
    console.log('crit 143((((( :::::::', criteria)
    return criteria;
}
