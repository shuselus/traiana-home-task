import { GOTO_PAGE } from '../actions/appActions';

 const routerReducer = (state = {}, action) => {
    switch (action.type) {
        case GOTO_PAGE:
            return {...state, page: action.page} ; 
        default:
          return state;
      }
}

export default routerReducer