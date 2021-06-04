const initialState = {
    boards: [],// all the boards as arr
    currBoard: {}, // just the selected board as obj
    filterBy: {},
};

// const idx = state.boards.findIndex(board => board._id === action.board._id)
// state.boards.splice(idx, 1, action.board)

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD': // should come from getById
            return { ...state, currBoard: action.board };

        case 'SET_BOARDS': // should come from query -> the collection of all the boards 
            return { ...state, boards: [...action.boards] };

        case 'ADD_BOARD':
            return { ...state, boards: [...state.boards, action.board] };

        case 'REMOVE_BOARD':
            return {
                ...state,
                boards: state.boards.filter(
                    (board) => board._id !== action.boardId
                ),
            };
        case 'UPDATE_BOARD':
            console.log('action.board in reducer =', action.board)
            return {
                ...state,
                boards: state.boards.map((board) =>
                    board._id === action.board._id ? action.board : board
                ),
                currBoard: action.board
            };
        case 'LOADING_BOARDS':
            return { ...state, isLoading: action.isLoading, err: null };
        case 'SET_FILTER':
            return { ...state, filterBy: action.filterBy };



        // case 'SET_SEARCH':
        //     return { ...state, currSearchBy: action.searchTxt }

        // case 'GET_FILTERD_TODOS':
        //     return { ...state, todos: [...action.todos] }
        default:
            return state;
    }
}
