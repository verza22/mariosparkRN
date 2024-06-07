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

export const orders = []

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

export const hotelRooms = [];

export const hotelOrders = [];