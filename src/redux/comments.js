//import {COMMENTS} from '../shared/comments';
import * as ActionTypes from './ActionTypes';


// Reducer function where action is dispatched and then initiated
export const Comments = (state= {errMess: null, comments:[]},action)=>{
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
        return {...state,isLoading:false,errMess:null,promos:action.payload}
        case ActionTypes.ADD_COMMENT:
            const comment=action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            return {...state, comments: state.comments.concat(comment)};
        case ActionTypes.COMMENTS_FAILED: 
            return  {...state,isLoading:false,errMess:action.payload}
        default:
            return state;
    }
}