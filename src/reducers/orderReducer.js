import {ORDER_ITEMS, ADD_ORDER_ITEM, REMOVE_ORDER_ITEM, UPDATE_ORDER_ITEM} from '../actions/appActions';

let initialState = {
    orderItems: [],
  }

 const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_ITEMS:
            return {...state, orderItems: action.items} ; 
        case ADD_ORDER_ITEM:
            return {...state,  orderItems: [...state.orderItems, action.item]} ;   
        case REMOVE_ORDER_ITEM:
          return {...state, orderItems: state.orderItems.filter((item) => item.id !== action.item.id)};
        case UPDATE_ORDER_ITEM:
          return { ...state, orderItems: state.orderItems.map((item) => 
                        item.id === action.item.id ?
                        {...item, ...action.item}:
                        item                
                      )
          };
        default:
          return state;
      }
}


export default orderReducer