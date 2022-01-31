import { EDIT_POST } from "../actionType/edit";
export const editPost=(id)=>async(dispatch)=>{
    dispatch({type:EDIT_POST,payload:id})
}
