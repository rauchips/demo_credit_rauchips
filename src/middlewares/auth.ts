import * as jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import dotenv from 'dotenv';

dotenv.config();

import { JWT } from '../utils';

export function generateToken(id: string, email: string): string {
  return jwt.sign({ data: { id, email }}, 'hello world', { expiresIn: '1h' }); 
}

export function veritfyToken() {
  const token = expressjwt({ secret: 'hello world', algorithms: ["HS256"] });
  return token;
}
