import {ALL_ITEMS} from '../actions/appActions';

let initialState = {
   items: []
  }

 const ingredientsReducer = (state = initialState, action) => {
    const { items } = action;
    switch (action.type) {
        case ALL_ITEMS:
            //return {...state, items: action.items} ; 
            return items;
        default:
          return state;
      }
}

export default ingredientsReducer