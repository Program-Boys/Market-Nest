export const MP_SELECT_USER = {
  id: true,
  name: true,
  email: true,
  cpf: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
  cart: true,
};

export const MP_SELECT_GET_USER = {
  id: true,
  name: true,
  email: true,
  cpf: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
  cart: {
    select: {
      id: true,
      clientId: false,
      cartItems: {
        select: {
          quantity: true,
          product: true,
        },
      },
    },
  },
  resetToken: true,
};
