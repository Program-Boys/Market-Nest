export interface IUserList {
  id: string;
  name: string;
  password?: string;
  email: string;
  cpf: string;
}

export interface IUser {
  id?: string;
  name: string;
  password: string;
  email: string;
  cpf: string;
  updatedAt?: Date;
}
