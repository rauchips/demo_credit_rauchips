import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from "express";

import UserService from "../modules/users/service";
import WalletService from '../modules/wallets/service';
import { generateToken } from '../middlewares/auth';
import { IUser } from '../modules/users/model';

const userService: UserService = new UserService();
const walletService: WalletService = new WalletService();

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;

    const filter = await userService.filterUser('email', email);

    const id: string = uuidv4();

    filter.length > 0 ?
      res.status(401).json({ message: 'User already exists.' }) :

      await userService.createUser({
        id,
        name,
        email,
        password: await bcrypt.hash(password, 10)
      })
        .then(async () => {
          const token = generateToken(id, email);

          const wallet = await walletService.createWallet({
            id: uuidv4(),
            userId: id
          });
          return res.status(201).json({
            id,
            token,
            wallet,
            message: 'New user has been created successfully'
          });
        });

  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const filter = await userService.filterUser('email', email);
    if (filter.length === 0) return res.status(401).json({ message: 'Kindly register first' })

    const matchPass = await bcrypt.compare(password, filter[0].password);
    if (!matchPass) return res.status(401).json({ message: 'Kindly enter the right password' })

    return res.status(200).json(filter);

  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getUsers()

    return res.status(200).json({
      count: users.length,
      data: users
    })
  } catch (error) {
    console.error(error);
    next(error);
  }
}