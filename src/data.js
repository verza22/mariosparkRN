export const categories = [];

export const products = [];

export const customers = [];

export const userType = {
  ADMIN: 1,
  CASHIER: 2,
  WAITER: 3,
  CHEF: 4
}

export const users = []

export const orderStatus = {
  PENDIENTE: 1,
  ENTREGADO: 2,
  CANCELADO: 3
}

export const orders = [
  {
    id: 1,
    cashierID: 2,
    tableNumber: 1,
    waiterID: 3,
    chefID: 5,
    total: 20,
    date: "2023-01-01 00:00:00",
    paymentMethod: "Efectivo",
    orderStatus: orderStatus.PENDIENTE,
    customer: {
      id: 1,
      dni: "0123456789",
      name: "Customer 1", 
      email: 'test@example.com', 
      phone: '0994512345', 
      address: 'NA'
    },
    products: [
      {
        id: 1,
        name: "Pizza Margherita 2",
        description: "",
        price: 10,
        quantity: 2
      }
    ]
  }
]

export const hotelOrderType = {
  RESERVADO: 1,
  HOSPEDADO: 2,
  TERMINADO: 3
}

export const hotelRoomType = {
  PLAYA: 'Playa',
  CEMENTO: 'Cemento',
  CEMENTO2: 'Cemento B',
  CABANA: 'Cabaña'
}

export const hotelRoomTypes = [
  { id: hotelRoomType.PLAYA, name: hotelRoomType.PLAYA },
  { id: hotelRoomType.CEMENTO, name: hotelRoomType.CEMENTO },
  { id: hotelRoomType.CEMENTO2, name: hotelRoomType.CEMENTO2 },
  { id: hotelRoomType.CABANA, name: hotelRoomType.CABANA }
]

export const hotelRooms = [
  { id: 1, name: '1', capacity: 4, type: hotelRoomType.CEMENTO },
  { id: 2, name: '2', capacity: 5, type: hotelRoomType.PLAYA },
  { id: 3, name: '3', capacity: 6, type: hotelRoomType.CEMENTO2 }
];

export const hotelOrders = [
  {
    id: 1,
    userID: 2,
    total: 20,
    dateIN: "2023-01-01 00:00:00",
    dateOUT: "2023-01-03 00:00:00",
    paymentMethod: "Efectivo",
    people: 6,
    room: {
      id: 1,
      name: '1',
      type: hotelRoomType.CEMENTO,
      capacity: 4
    },
    customer: {
      id: 1,
      dni: "0123456789",
      name: "Customer 1", 
      email: 'test@example.com', 
      phone: '0994512345', 
      address: 'NA'
    }
  }
];