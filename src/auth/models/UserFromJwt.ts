import { ICart } from 'src/user/entities/cart.interface';

export class UserFromJwt {
  id: number | string;
  email: string;
  name: string;
  isActive: boolean;
  cart: ICart;
}
