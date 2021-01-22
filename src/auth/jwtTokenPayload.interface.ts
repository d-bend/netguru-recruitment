export interface JwtTokenPayload {
  userId: number;
  name: string;
  role: 'basic' | 'premium';
  iat: number;
  exp: number;
  iss: 'https://www.netguru.com/';
  sub: number;
}
