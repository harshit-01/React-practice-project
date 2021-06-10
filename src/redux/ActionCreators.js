import * as ActionTypes from './ActionTypes';
//import {DISHES} from '../shared/dishes';
import {baseUrl} from '../shared/baseUrl';

export const addComment = (dishId,rating,author,comment)=>({
        type:ActionTypes.ADD_COMMENT,
        payload:{
            dishId: dishId,
            rating: rating,
            author: author,
            comment: comment
        }

});
// Thunk Middleware.Passed as a special store enhancer which has its own dispatch ,action arguments
export const fetchDishes = () => (dispatch) => {
    
    dispatch(dishesLoading());

    return fetch(baseUrl + 'dishes')
    .then(response=>{
            if(response.ok){
                return response;
            }
            else{
                var err = new Error('Error'+ response.status+response.statusText);
                err.response = response;
                throw err;
            }
    }, error=>{
        var errMess= new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error=>dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl+ 'comments').then(response =>response.json())
        .then(response=>{
            if(response.ok){
                return response;
            }
            else{
                var err = new Error('Error'+ response.status+response.statusText);
                err.response = response;
                throw err;
            }
    }, error=>{
        var errMess= new Error(error.message);
        throw errMess;
    }).then(comments=> dispatch(addComments(comments))).catch(error=>dispatch(commentsFailed(error.message)))
}
//Action

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response=>{
            if(response.ok){
                return response;
            }
            else{
                var err = new Error('Error'+ response.status+response.statusText);
                err.response = response;
                throw err;
            }
    }, error=>{
        var errMess= new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error=>dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});
export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
