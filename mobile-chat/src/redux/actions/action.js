import { fiturAPI } from "../../utils/Contents";
import { ADD_EVENT, ADD_TODO, EVENT_ID, POST_EVENT, POST_TODO, TODO_ID } from "../../utils/ActionTypes";
import axios from "axios";

// fetching event
export const fetchDataEvent = () => {
    let changeableUrl = fiturAPI;
    return (dispatch) => {
        axios
            .get(`${changeableUrl}event`)
            .then((res) => {
                dispatch(fetchEvent(res.data));
            })
            .catch((e) => {
                console.log("error haha");
                console.log(e);
            });
    };
};

const fetchEvent = (data) => {
    return {
        type: ADD_EVENT,
        data: data,
    };
};

export const fetchEventById = (id) => {
    let changeableUrl = `${fiturAPI}event/${id}`;
    return (dispatch) => {

        axios.get(changeableUrl).then((res) => {
            dispatch(fetchEventId(res.data));
        });
    };
};

const fetchEventId = (data) => {
    return {
        type: EVENT_ID,
        data: data,
    };
};

export const postEvent=(data)=>{
    let changeableUrl = `${fiturAPI}event`;
    console.log(data);

    return (dispatch)=>{
        axios.post(changeableUrl, data).then(res=>{
            // dispatch(postEventAction(res.data))
            console.log("Success");

        }).catch(e=>{
            console.log("Gagal Jum "+ e);

        })
    }
}

const postEventAction=(data)=>{
    return {
        type: POST_EVENT,
        data: data
    }
}

export const deleteEvent=async(id)=>{
    let changeableUrl = `${fiturAPI}event/${id}`;
    return await axios.delete(changeableUrl).then(res=>{
        console.log("Succes delete ");

    }).catch(e=>{
        console.log("gagal "+ e);

    })
}

// fetching todo
export const fetchDataTodo = () => {
    let changeableUrl = fiturAPI;
    return (dispatch) => {
        axios
            .get(`${changeableUrl}todo`)
            .then((res) => {
                dispatch(fetchTodo(res.data));
            })
            .catch((e) => {
                console.log("Todo Fetch Error");
                console.log(e);
            });
    };
};

const fetchTodo = (data) => {
    return {
        type: ADD_TODO,
        data: data,
    };
};

export const postTodo=(data)=>{
    let changeableUrl = `${fiturAPI}todo/`;
    console.log(data);

    return (dispatch)=>{
        axios.post(changeableUrl, data).then(res =>{
            console.log(res.data);
            dispatch(postTodoAction(res.data))
            console.log("Succes post Todo");
        }).catch(e=>{
            console.log("hahah gagal "+e);

        })
    }
}

const postTodoAction=(data)=>{
    return {
        type: POST_TODO,
        data: data
    }
}
export const fetchTodoById = (id) => {
    let changeableUrl = `${fiturAPI}todo/${id}`;
    return (dispatch) => {
        axios.get(changeableUrl).then((res) => {
            dispatch(fetchTodoId(res.data));
        });
    };
};

const fetchTodoId = (data) => {
    return {
        type: TODO_ID,
        data: data,
    };
};
