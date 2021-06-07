import {createStore,combineReducers, applyMiddleware} from 'redux'
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';



export const ConfigureStore = ()=>{
    const store = createStore(combineReducers({
          dishes:Dishes,
          leaders:Leaders,
          promotions:Promotions,
          comments:Comments,
          ...createForms({
            feedback: InitialFeedback
        })
    }),
    applyMiddleware(thunk, logger)
    );
        return store;
}

