import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: string;
  userType: string;
  email: string;
  exp: number;
  iat: number;
  userId:string;
}

export const decodeJWT = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Invalid JWT token", error);
    return null;
  }
};