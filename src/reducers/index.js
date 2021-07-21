import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientsReducer';
import orderReducer from './orderReducer';
import routerReducer from './routerReducer';

const rootReducer = combineReducers({
    ingrReducer: ingredientsReducer,
    orderReducer: orderReducer,
    routerReducer: routerReducer
});

export default rootReducer;