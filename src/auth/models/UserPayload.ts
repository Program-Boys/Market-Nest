export interface UserPayload {
  sub: number | string;
  email: string;
  name: string;
  isActive: boolean;
  cart: {};
  iat?: number;
  exp?: number;
}
