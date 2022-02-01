import { FETCH_INFO } from "../actionType/userinfo";
import { EmptyUserInfo } from "../states/userinfo";

export const userinfo=(state=EmptyUserInfo,action)=>{
    switch(action.type){
        case FETCH_INFO:
            console.log("In reduce fetch user info");
            var tempState=state;
            tempState.info=action.payload;
            return tempState;
        default:
            return state;
    }
}