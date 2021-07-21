import axios from 'axios';

export const ALL_ITEMS = "ALL_ITEMS";
export const ORDER_ITEMS = "ORDER_ITEMS";
export const ADD_ORDER_ITEM = "ADD_ORDER_ITEM";
export const REMOVE_ORDER_ITEM = "REMOVE_ORDER_ITEM";
export const UPDATE_ORDER_ITEM = "UPDATE_ORDER_ITEM";
export const ERROR_ON_FETCH_API_DATA = "ERROR_ON_FETCH_API_DATA";
export const GOTO_PAGE = 'GOTO_PAGE';

export const getAllItems = (items) => {
    return {
        type: ALL_ITEMS,
        items: items
    }
}

export const setOrderItems = (items) => {
    return {
        type: ORDER_ITEMS,
        items: items
    }
}

export const addOrderItem = (item) => {
    return {
        type: ADD_ORDER_ITEM,
        item: item
    }
}

export const removeOrderItem = (item) => {
    return {
        type: REMOVE_ORDER_ITEM,
        item: item
    }
}

export const updateOrderItem = (item) => {
    return {
        type: UPDATE_ORDER_ITEM,
        item: item
    }
}

export const gotoPage = (page) => {
    return {
        type: GOTO_PAGE,
        page: page
    }
}

export const errorOnFetchApiData = (error) => {
    return{
        type: ERROR_ON_FETCH_API_DATA,
        error: error
    }
}

export const fetchIngedientsData = () => {
    return function(dispatch) {
        return axios.get("./salad.json")
          .then(({ data }) => {
              console.log("data: ", data)
             dispatch(getAllItems(data.items));
          })
          .catch(error => dispatch(errorOnFetchApiData(error)) );
      };
}

