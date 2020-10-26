import axios from "axios";
import {GET_ITEMS,ADD_ITEM,DELETE_ITEM, ITEMS_LOADING} from "./types";

export const getItems = (id) =>(dispatch)=>{
  dispatch(setItemsLoading());
  axios
  .get(`api/items/${id}`)
  .then(res=>{
    return dispatch({
        type:GET_ITEMS,
        payload:res.data
    })
}
    );
};
export const deleteItem = (id,authID) =>(dispatch)=>{
 axios.delete(`api/items/${id}/${authID}`)
 .then(res=>{
    
    return dispatch({
     type:DELETE_ITEM,
     payload: res.data
 })
}
 )
};
export const addItem = (item) => dispatch =>{
   axios
   .post('api/items',item)
   .then(res=>
    dispatch({
        type:ADD_ITEM,
        payload:res.data
    }))
};
export const setItemsLoading = () =>{
   
    return {
        type:ITEMS_LOADING,
    };
};