import { boardService } from '../../services/boardService.js';
import { socketService } from '../../services/socketService';

export function loadBoards(filterBy) {
    return async (dispatch) => {
        try {
            const boards = await boardService.query(filterBy);
            dispatch({ type: 'SET_BOARDS', boards });
        } catch (err) {
            console.log('BoardActions: err in loadBoards', err);
        }
    };
}

export function loadBoard(boardId) {
    // console.log(`file: boardActions.js || line 16 || boardId`, boardId)
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId);
            // console.log(`SET BOARD action for`, board._id, 'title:', board.title);
            dispatch({ type: 'SET_BOARD', board });
            return board;
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err);
        }
    };
}

export function updateBoard(board) {
    return async (dispatch) => {
        try {
            const updatedBoard = await boardService.update(board);
            // console.log('34 * updated board in actions =', updatedBoard._id, 'title:', updatedBoard.title);
            await socketService.emit('board updated', updatedBoard._id);
            dispatch({ type: 'UPDATE_BOARD', board: updatedBoard });
        } catch (err) {
            console.log('BoardActions: err in updateBoard', err);
        }
    };
}

export function addBoard(board) {
    return async (dispatch) => {
        try {
            const addedBoard = await boardService.add(board);
            // console.log('added board', addedBoard);
            dispatch({ type: 'ADD_BOARD', board: addedBoard });
        } catch (err) {
            console.log('BoardActions: err in addBoard', err);
        }
    };
}

export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId);
            dispatch({ type: 'REMOVE_BOARD', boardId });
        } catch (err) {
            console.log('BoardActions: err in removeBoard', err);
        }
    };
}

export function onSetFilter(filterBy) {
    // console.log('set filter in store');
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER', filterBy });
    };
}


