import { boardService } from '../../services/boardService.js'

export function loadBoards() {
    return async dispatch => {
        try {
            const boards = await boardService.query()
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log('BoardActions: err in loadBoards', err);
        }
    }
}

export function loadBoard(boardId) {
    console.log('boardId',boardId)
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err);
        }
    }
}

export function addBoard(board) {
    return async dispatch => {
        try {
            const addedBoard = await boardService.add(board)
            dispatch({ type: 'ADD_BOARD', board: addedBoard })

        } catch (err) {
            console.log('BoardActions: err in addBoard', err)
        }
    }
}

export function removeBoard(boardId) {
    return async dispatch => {
        try {
            await boardService.remove(boardId)
            dispatch({ type: 'REMOVE_BOARD', boardId })
        } catch (err) {
            console.log('BoardActions: err in removeBoard', err)
        }
    }
}

export function updateBoard(board) {
    return async dispatch => {
        try {
            const updatedBoard = await boardService.update(board)
            dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })

        } catch (err) {
            console.log('BoardActions: err in updateBoard', err)
        }
    }
}
