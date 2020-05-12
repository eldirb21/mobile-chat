const initialState = {
    username:'',
    password:'',
    status:'',
    id:'',
    email:'',
    fullName:'',
}

const loginReducer = (state=initialState,action) =>{
    if(action.type==="LOGIN"){
        return{
            ...state,
            username: action.post.username,
            password: action.post.password,
            status: action.data.details
        }
    }
    else if(action.type==="FETCH_ACCOUNT"){
        return{
            ...state,
            id:action.data.id,
            email:action.data.email,
            fullName:action.data.fullName,
        }
    }
    else if(action.type==="LOGOUT"){
        return{
            ...state,
            username:'',
            password:'',
            status:'',
            id:'',
            email:'',
            fullName:'',
        }
    }
    return state
}
export default loginReducer
