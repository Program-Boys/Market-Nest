export interface UserPayload {
  sub: number | string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
