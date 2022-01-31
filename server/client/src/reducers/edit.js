import { EDIT_POST } from "../actionType/edit";
import { EmptyEdit } from "../states/edit";

export const edit=(state=EmptyEdit,action)=>{
    switch(action.type){
        case EDIT_POST:
            console.log("In reduce editpost");
            var tempState=state;
            tempState.postId=action.payload;
            return tempState;
        default:
            return state;
    }
}