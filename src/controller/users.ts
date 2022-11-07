import UserService from "../modules/users/service";
import { Request, Response, NextFunction } from "express";

const userService: UserService = new UserService();

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getUsers();
    return res.status(200).json(users)
  } catch (error) {
    console.error(error);
    next(error);
  }
}