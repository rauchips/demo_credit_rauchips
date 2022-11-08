import UserService from "../modules/users/service";
import { Request, Response, NextFunction } from "express";

const userService: UserService = new UserService();

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;

    const filter = await userService.filterUser(email);

    filter.length > 0 ?    
    res.status(401).json({ message: 'User already exists.'}) :
    await userService.createUser(req.body)
      .then(id => {
        return res.status(201).json({ id, message: 'New user has been created successfully' });
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