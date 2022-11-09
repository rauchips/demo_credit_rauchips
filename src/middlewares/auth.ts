import * as jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import dotenv from 'dotenv';

dotenv.config();

import { JWT } from '../utils';

export function generateToken(id: string, email: string): string {
  return jwt.sign({ data: { id, email }}, `${JWT}`, { expiresIn: '1y' }); 
}

export function veritfyToken() {
  const token = expressjwt({ secret: `${JWT}`, algorithms: ["HS256"] });
  return token;
}
