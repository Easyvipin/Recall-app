import axios from "axios";
import {USER_LOGIN,USER_REGISTER,AUTH_LOADING,AUTH_PAGE} from "./types";

export const regUser = (user) =>(dispatch)=>{
  dispatch(setAuthLoading());
    axios
    .post("auth/register",user)
    .then(resp=>{
      
        return dispatch({
            type:USER_REGISTER,
            payload:resp.data
        })
    })   
}
export const logUser = (user) =>(dispatch)=>{
    dispatch(setAuthLoading());
    axios
    .post("auth/login",user)
    .then(resp=>{
        return dispatch({
            type:USER_LOGIN,
            payload:resp.data
        })
    })
}

export const authUser = () =>(dispatch)=>{
    dispatch(setAuthLoading());
    axios
    .get("/check", { withCredentials: true })
    .then(resp=>{
            return dispatch({
                type:AUTH_PAGE,
                payload:resp.data
            })  
    })
}
const setAuthLoading = () =>{
    return {
        type:AUTH_LOADING
    }
} 