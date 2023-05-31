export const MP_SELECT_USER = {
  id: true,
  name: true,
  email: true,
  cpf: true,
  createdAt: true,
  isActive: true,
  cart: true,
};

export const MP_INCLUDE_USER = {
  cart: { include: { cartItems: true } },
};
