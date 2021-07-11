// import { storageService } from './asyncStorageService';
import { httpService } from './httpService';
import { userService } from './userService';

export const boardService = {
    query,
    getById,
    add,
    update,
    remove,
};

async function query(filterBy) {
    // return storageService.query('board', filterBy);
    return httpService.get('board', { params: filterBy });
}

async function getById(boardId) {
    // console.log(`file: boardService.js || line 18 || filterBy`, filterBy)
    // return storageService.get('board', boardId)
    return httpService.get(`board/${boardId}`);
}

async function remove(boardId) {
    console.log('removing in service', boardId)
    // return storageService.remove('board', boardId);
    return httpService.delete(`board/${boardId}`);
}

async function update(board) {
    // we might need to change this to the id of the board
    // return storageService.put('board', board);
    return httpService.put(`board/${board._id}`, board);
}

async function add() {
    // return storageService.post('board', board);
    const currUser = userService.getLoggedinUser();
    return httpService.post(`board`, currUser);
}
