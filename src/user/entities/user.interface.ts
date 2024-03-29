import { ICart } from './cart.interface';

export interface IUserList {
  id: string;
  name: string;
  password?: string;
  email: string;
  cpf: string;
  isActive: boolean;
}

export interface IUser {
  id?: string;
  name: string;
  password: string;
  email: string;
  cpf: string;
  isActive: boolean;
  updatedAt?: Date;
  cart?: ICart;
  resetToken?: string;
}
