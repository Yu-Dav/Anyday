const initialState = {
    boards: [],
    currBoard: {},
    filterBy: {
        txt: '',
        membersId: [],
        priority: [],
        status: [],
        tag: []
    },
};

// const idx = state.boards.findIndex(board => board._id === action.board._id)
// state.boards.splice(idx, 1, action.board)

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD': // should come from getById
            // console.log('SET BOARD in reducer =', action.board);
            return { ...state, currBoard: { ...action.board } };

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
            // console.log('UPDATE board: in reducer =', action.board);
            return {
                ...state,
                currBoard: action.board,
                boards: state.boards.map((board) =>
                    board._id === action.board._id ? action.board : board
                ),
            };
        // return { ...state,boards: [action.board, ...state.boards.filter(board => action.board._id !== board._id)],  currBoard: {...action.board}}
        case 'LOADING_BOARDS':
            return { ...state, isLoading: action.isLoading, err: null };

        case 'SET_FILTER':
            console.log('set filter in reducer', action.filterBy);
            return { ...state, filterBy: action.filterBy };

        // case 'SET_SEARCH':
        //     return { ...state, currSearchBy: action.searchTxt }

        // case 'GET_FILTERD_TODOS':
        //     return { ...state, todos: [...action.todos] }
        default:
            return state;
    }
}
