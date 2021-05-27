import { storageService } from './asyncStorageService';
// import { httpService } from './httpService'

export const boardService = {
    query,
    getById,
    add,
    update,
    remove,
};

async function query(filterBy) {
    return storageService.query('board', filterBy);
    // return httpService.get('board', { params: filterBy });
}

async function getById(boardId) {
    return storageService.get('board', boardId)
    // return httpService.get(`board/${boardId}`);
}

async function remove(boardId) {
    return storageService.remove('board', boardId)
    // return httpService.delete(`board/${boardId}`);
}

async function update(board) {
    return storageService.put('board', board) // we might need to change this to the id of the board 
    // return httpService.put(`board/${board._id}`, board);
}

async function add(board) {
    return storageService.post('board', board)
    // return httpService.post(`board`, board);
}

async function saveTask(boardId, task) { 
    if (task._id) {
        
    }
    // should find the relevant board using boardId, then push the new task into the existing arr? 
}