export interface UserPayload {
  sub: number | string;
  email: string;
  name: string;
  isActive: boolean;
  iat?: number;
  exp?: number;
}
