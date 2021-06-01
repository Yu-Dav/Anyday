const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('board_db');
        var boards = await collection.find().toArray();
        console.log(`file: board.service.js || line 11 || boards`, boards);
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
async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board_db');
        const board = await collection.findOne({ _id: ObjectId(boardId) });
        return board;
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err);
        throw err;
    }
}
//missing save/update

async function update(board) {
    console.log(`file: board.service.js || line 36 || board`, board);
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
            tags: board.tags                                   
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
    console.log(`file: board.service.js || line 55 || board`, board);
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
