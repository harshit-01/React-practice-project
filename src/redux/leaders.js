// import {LEADERS} from '../shared/leaders';
import * as ActionTypes from './ActionTypes';


export const Leaders = (state={ isLoading:true,
                                errMess :null, 
                            leaders:[]},action)=>{
    switch(action.type){
        case ActionTypes.ADD_LEADERS: 
              return {...state,isLoading:false,errMess:null,leaders:action.payload};
         case ActionTypes.POST_FEEDBACK:
             const postFeedback=action.payload;
             //console.log("Comment: ", comment);
             return {...state,newFeedback: state.leaders.concat(postFeedback)};
        case ActionTypes.DISHES_LOADING:
              return {...state, isLoading:true,errMess:null,leaders:[]}
        case ActionTypes.DISHES_FAILED: 
              return  {...state,isLoading:false,errMess:action.payload}
        default:
            return state;
    }
}