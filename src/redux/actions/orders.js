import { DataSuccess, DataFailure, axiosRequest } from './dataRequest';

export const GET_ORDERS = 'GET_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';
export const ADD_ORDER_WITHOUT_ETHERNET = 'ADD_ORDER_WITHOUT_ETHERNET';
export const CLEAR_ORDER_WITHOUT_ETHERNET = 'CLEAR_ORDER_WITHOUT_ETHERNET';

export function GetOrders(storeID) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'order/getOrders',
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

export function AddOrder({storeID, callback, cashierID,waiterID,chefID,total,tableNumber,date,paymentMethod,orderStatus,customer,products}) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'order/InsertOrder',
      params: {
        cashierID,
        waiterID,
        chefID,
        total,
        tableNumber,
        date,
        paymentMethod,
        orderStatus,
        customer: JSON.stringify(customer),
        products: JSON.stringify(products),
        storeID
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: ADD_ORDER,
          id: res,
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
        });
        callback(res);
      }
    })
    .catch(err=>{
      dispatch({
        type: ADD_ORDER_WITHOUT_ETHERNET,
        cashierID,
        waiterID,
        chefID,
        total,
        tableNumber,
        date,
        paymentMethod,
        orderStatus,
        customer,
        products,
        storeID
      });
      callback('');
    });
  }
}

export function SyncOrders(orders) {
  return (dispatch, getState) => {
    axiosRequest({
      dispatch, 
      getState,
      method: 'post',
      url: 'order/SyncOrders',
      showError: false,
      params: {
        data: JSON.stringify(orders)
      }
    })
    .then(res=>{
      dispatch(DataSuccess());
      if(res > 0){
        dispatch({
          type: CLEAR_ORDER_WITHOUT_ETHERNET
        });
      }
    })
  }
}