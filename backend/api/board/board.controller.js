const boardService = require('./board.service');
const socketService = require('../../services/socket.service');
const logger = require('../../services/logger.service');

async function getBoard(req, res) {
    const filterBy = req.query || {};
    try {
        const board = await boardService.getById(req.params.id, filterBy);
        // const filteredBoard = {};
        // filteredBoard.groups.filter(group => {
        //     group.tasks.filter(task => {

        //     })
        // })
        res.send(board);
    } catch (err) {
        logger.error('Failed to get board', err);
        res.status(500).send({ err: 'Failed to get board' });
    }
}

async function getBoards(req, res) {
    try {
        // const filterBy = {
        //     txt: req.query?.txt || '',
        //     minBalance: +req.query?.minBalance || 0
        // }
        // filterBy from toys
        // const filterBy = {
        //     name: req.query?.name || '',
        //     inStock: req.query?.inStock || 'all',
        //     type: req.query?.type || 'all',
        //     sortBy: req.query?.sortBy || 'all'
        // }
        const boards = await boardService.query();
        res.send(boards);
    } catch (err) {
        logger.error('Failed to get boards', err);
        res.status(500).send({ err: 'Failed to get boards' });
    }
}

async function removeBoard(req, res) {
    try {
        await boardService.remove(req.params.id);
        res.send({ msg: 'Deleted successfully' });
    } catch (err) {
        logger.error('Failed to delete board', err);
        res.status(500).send({ err: 'Failed to delete board' });
    }
}

async function updateBoard(req, res) {
    try {
        const board = req.body;
        const savedBoard = await boardService.update(board);
        res.send(savedBoard);
        // socketService.broadcast({type: 'board-updated', data: review, to:savedBoard._id})
    } catch (err) {
        logger.error('Failed to update board', err);
        res.status(500).send({ err: 'Failed to update board' });
    }
}

async function addBoard(req, res) {
    try {
        const currUser = req.body;
        console.log(`file: board.controller.js || line 68 || currUser`, currUser)
        const addedBoard = await boardService.add(currUser);
        res.send(addedBoard);
    } catch (err) {
        logger.error('Failed to add new board', err);
        res.status(500).send({ err: 'Failed to add new board' });
    }
}

module.exports = {
    getBoard,
    getBoards,
    removeBoard,
    updateBoard,
    addBoard,
};
