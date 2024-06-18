import { GET_ORDERS, ADD_ORDER, ADD_ORDER_WITHOUT_ETHERNET, CLEAR_ORDER_WITHOUT_ETHERNET } from './../actions/orders';

const initialState = {
    orders: [],
    ordersToUpload: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
        return {
          ...state,
          orders: action.orders
        };
    case ADD_ORDER:
        return {
          ...state,
          orders: [...state.orders,
            { 
              id: action.id, 
              cashierID: action.cashierID,
              waiterID: action.waiterID,
              chefID: action.chefID,
              total: action.total,
              date: action.date,
              tableNumber: action.tableNumber,
              paymentMethod: action.paymentMethod,
              orderStatus: action.orderStatus,
              customer: action.customer,
              products: action.products
            }
          ]
        };
    case ADD_ORDER_WITHOUT_ETHERNET:
      let maxId = Math.max.apply(Math, state.orders.map(x=> x.id));
      let newOrder = { 
        id: maxId+1, 
        cashierID: action.cashierID,
        waiterID: action.waiterID,
        chefID: action.chefID,
        total: action.total,
        date: action.date,
        tableNumber: action.tableNumber,
        paymentMethod: action.paymentMethod,
        orderStatus: action.orderStatus,
        customer: action.customer,
        products: action.products
      };
      return {
        ...state,
        orders: [...state.orders, newOrder],
        ordersToUpload: [...state.ordersToUpload,
          {
            Id: 0,
            CashierId: action.cashierID,
            TableNumber: action.tableNumber,
            WaiterId: action.waiterID,
            ChefId: action.chefID,
            Total: action.total,
            Date: action.date,
            PaymentMethod: action.paymentMethod,
            OrderStatusId: action.orderStatus,
            StoreId: action.storeID,
            Customer: action.customer,
            Products: action.products
          }
        ]
      };
    case CLEAR_ORDER_WITHOUT_ETHERNET:
      return {
        ...state,
        ordersToUpload: []
      };
      break;
    default:
      return state;
  }
}

export default reducer;
