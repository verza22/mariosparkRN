import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';

export const GET_ORDERS = 'GET_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';

export function GetOrders(token, storeID) {
  return dispatch => {
    axiosRequest({
      dispatch, 
      method: 'post',
      url: 'order/getOrders',
      token,
      params: {
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res.length > 0){
        dispatch({
          type: GET_ORDERS,
          orders: res
        });
      }
    })
  }
}

export function AddOrder({cashierID,waiterID,chefID,total,tableNumber,date,paymentMethod,orderStatus,customer,products}) {
    return {
        type: ADD_ORDER,
        cashierID,
        waiterID,
        chefID,
        total,
        tableNumber,
        date,
        paymentMethod,
        orderStatus,
        customer,
        products
    };
  }