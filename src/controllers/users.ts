import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from "express";

import UserService from "../modules/users/service";
import { generateToken } from '../middlewares/auth';

const userService: UserService = new UserService();

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, name, email, password } = req.body;

    const filter = await userService.filterUser(email);

    filter.length > 0 ?
      res.status(401).json({ message: 'User already exists.' }) :
      await userService.createUser({
        id: uuidv4(),
        name,
        email,
        password: await bcrypt.hash(password, 10)
      })
        .then(() => {
          const token = generateToken(id, email);
          return res.status(201).json({ 
            token,
            message: 'New user has been created successfully' });
        });

  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
      const users = await userService.getUsers();
      return res.status(200).json({
        count: users.length,
        data: users
      })
  } catch (error) {
    console.error(error);
    next(error);
  }
}