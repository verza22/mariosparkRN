export const categories = [
    { id: 1, name: 'Pizza 1', image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Sushi', image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Indian', image: 'https://via.placeholder.com/50' },
    { id: 4, name: 'Burgers', image: 'https://via.placeholder.com/50' },
    { id: 5, name: 'Pasta', image: 'https://via.placeholder.com/50' },
    { id: 6, name: 'Asian', image: 'https://via.placeholder.com/50' },
    { id: 7, name: 'Seafood', image: 'https://via.placeholder.com/50' },
    { id: 8, name: 'Drinks', image: 'https://via.placeholder.com/50' },
    { id: 9, name: 'Desserts', image: 'https://via.placeholder.com/50' },
    { id: 10, name: 'Wraps', image: 'https://via.placeholder.com/50' },
    // Agrega más categorías según sea necesario
  ];

export const products = [
    { id: 1, name: 'Pizza Margherita 2', description: "", price: 10, categoryId: 1, image: 'https://picsum.photos/200/300?food=1' },
    { id: 2, name: 'Sushi Combo', description: "", price: 20, categoryId: 2, image: 'https://picsum.photos/200/300?food=2' },
    { id: 3, name: 'Chicken Tikka Masala', description: "", price: 15, categoryId: 3, image: 'https://picsum.photos/200/300?food=3' },
    { id: 4, name: 'Burger and Fries', description: "", price: 12, categoryId: 4, image: 'https://picsum.photos/200/300?food=4' },
    { id: 5, name: 'Pasta Carbonara', description: "", price: 14, categoryId: 5, image: 'https://picsum.photos/200/300?food=5' },
    { id: 6, name: 'Veggie Stir Fry', description: "", price: 8, categoryId: 6, image: 'https://picsum.photos/200/300?food=6' },
    { id: 7, name: 'Shrimp Scampi', description: "", price: 14, categoryId: 7, image: 'https://picsum.photos/200/300?food=7' },
    { id: 8, name: 'Margarita Cocktail', description: "", price: 7, categoryId: 8, image: 'https://picsum.photos/200/300?food=8' },
    { id: 9, name: 'Chocolate Brownie', description: "", price: 5, categoryId: 9, image: 'https://picsum.photos/200/300?food=9' },
    { id: 10, name: 'Caesar Wrap', description: "", price: 9, categoryId: 10, image: 'https://picsum.photos/200/300?food=10' },
    { id: 11, name: 'Shrimp Scampi', description: "", price: 14, categoryId: 7, image: 'https://picsum.photos/200/300?food=7' },
    { id: 12, name: 'Margarita Cocktail', description: "", price: 7, categoryId: 8, image: 'https://picsum.photos/200/300?food=8' },
    { id: 13, name: 'Chocolate Brownie', description: "", price: 5, categoryId: 9, image: 'https://picsum.photos/200/300?food=9' },
    { id: 14, name: 'Caesar Wrap', description: "", price: 9, categoryId: 10, image: 'https://picsum.photos/200/300?food=10' },
    { id: 30, name: 'Ice Cream Sundae', description: "", price: 6, categoryId: 9, image: 'https://picsum.photos/200/300?food=30' },
    // ... Agrega más productos con categoryId según sea necesario
  ];

  export const customers = [
    { id: 1, name: 'Customer 1', dni: '0123456789', email: 'test@example.com', phone: '0994512345', address: 'NA' },
    { id: 2, name: 'Customer 2', dni: '0123456789', email: 'test@example.com', phone: '0994512345', address: 'NA' },
    { id: 3, name: 'Customer 3', dni: '0123456789', email: 'test@example.com', phone: '0994512345', address: 'NA' },
    { id: 4, name: 'Customer 4', dni: '0123456789', email: 'test@example.com', phone: '0994512345', address: 'NA' },
    { id: 5, name: 'Customer 5', dni: '0123456789', email: 'test@example.com', phone: '0994512345', address: 'NA' },
    { id: 6, name: 'Customer 6', dni: '0123456789', email: 'test@example.com', phone: '0994512345', address: 'NA' },
    { id: 7, name: 'Customer 7', dni: '0123456789', email: 'test@example.com', phone: '0994512345', address: 'NA' },
    { id: 8, name: 'Customer 8', dni: '0123456789', email: 'test@example.com', phone: '0994512345', address: 'NA' },
    { id: 9, name: 'Customer 9', dni: '0123456789', email: 'test@example.com', phone: '0994512345', address: 'NA' },
    { id: 10, name: 'Customer 10', dni: '0123456789', email: 'test@example.com', phone: '0994512345', address: 'NA' },
    // Agrega más clientes según sea necesario
  ];

export const userType = {
  ADMIN: 1,
  CASHIER: 2,
  WAITER: 3,
  CHEF: 4
}

export const users = [
  { id: 1, username: 'admin', name: 'administrador', password: '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', type: userType.ADMIN },
  { id: 2, username: 'caja1', name: 'Jamil Caja', password: '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', type: userType.CASHIER },
  { id: 3, username: 'mesero1', name: 'Mesero 1', password: '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', type: userType.WAITER },
  { id: 4, username: 'mesero2', name: 'Mesero 2', password: '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', type: userType.WAITER },
  { id: 5, username: 'chef1', name: 'Chef Tito', password: '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', type: userType.CHEF }
]

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
