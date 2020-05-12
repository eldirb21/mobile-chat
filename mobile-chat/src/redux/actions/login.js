import React from 'react';
import Axios from "axios";

function login(username,password) {
    return dispatch=>{
        const post = {
            username:username,
            password:password,
        }
        Axios.post("http://10.10.12.31:3939/user/login",post)
            .then(result=>{
                console.log(result.data)
                dispatch({type:"LOGIN", data:result.data, post:post})
            })
            .catch(err=>alert(err))

    }
}
export default login;
