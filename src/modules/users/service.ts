import { IUser } from "./model";
import db from '../../database';

export default class UserService {
  public async createUser(body: IUser) {
    const [id] = await db('users').insert(body);
    return id;
  }
  public async getUsers() {
    const users = await db.select('*').from('users');
    return users;
  }

  public async filterUser(query: string) {
    const user = await db('users').where('email', query)
    return user;
  }
}