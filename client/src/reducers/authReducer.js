
import {USER_LOGIN,USER_REGISTER,AUTH_LOADING,AUTH_PAGE} from "../actions/types";

const authState = {
    authID:'',
    error:{},
    loading:false,
    isauth:'',
    authUser:'',
}

export default function(state = authState,action){
    switch(action.type){
        case USER_REGISTER :
            if(action.payload.user_id){
            return {...state ,authID : action.payload.user_id,loading:false,error:{},isauth:true,authUser:action.payload.authUser}
            }
            else {
                return {...state ,error:action.payload.error,loading:false,}
            }
        case USER_LOGIN: 
           if(action.payload.user_id){
             return {...state ,authID:action.payload.user_id,loading:false,error:{},isauth:true,authUser:action.payload.authUser}
           }
           else {
            return {...state ,error:action.payload.error,loading:false}
           }
        case AUTH_LOADING :
            return{
              ...state,
              loading:true, 
            }
        case AUTH_PAGE :
            return{
             ...state, authID:action.payload.authId,loading:false,error:{},isauth:action.payload.auth,authUser:action.payload.authUser
            }
        
        default:
            return {
            ...state
           
            }   
    }
}