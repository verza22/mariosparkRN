export const ADD_ORDER = 'ADD_ORDER';

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