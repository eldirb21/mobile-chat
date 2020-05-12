import {
    ADD_EVENT,
    ADD_TODO,
    EVENT_ID,
    POST_EVENT,
    TODO_ID
} from "../../../utils/ActionTypes";

let initialState = {
    events: [],
    todos: [],
    detailEvent: [],
    detailTodo: []
};

const event = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EVENT:
            return {
                ...state,
                events:action.data,
            };

        case ADD_TODO:
            return {
                ...state,
                todos: action.data,
            };

        case EVENT_ID:
            console.log("masuk detail om");
            return {
                ...state,
                detailEvent: action.data,
            };
        case POST_EVENT:
            return {
                ...state,
                events: action.data,
            };
        case TODO_ID:
            console.log("detail todo ooooommmmm");

            return {
                ...state,
                detailTodo: action.data
            }

        default:
            return state;
    }
};

export default event;
