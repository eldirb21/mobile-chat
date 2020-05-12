import React from 'react';
import Axios from "axios";

function fetchAccount(username) {
    return dispatch=>{
        console.log("this is username fetch account",username);
        Axios.get("http://10.10.12.31:3939/user/"+username)
            .then(result=>{
                console.log(result.data)
                dispatch({type:"FETCH_ACCOUNT", data:result.data})
            })

    }
}
export default fetchAccount;
