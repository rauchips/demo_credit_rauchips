import { IWallet } from "./model";
import db from '../../database';

export default class WalletService {
  public async createWallet(body: IWallet) {
    const [id] = await db('wallets').insert(body);
    return id;
  }
  public async getWallets() {
    const wallets = await db.select('*').from('wallets');
    return wallets;
  }

  public async filterWallets(field: string, query: string) {
    const wallets = await db('wallets').where(field, query)
    return wallets;
  }

  public async depositWallets (id: string, query: number) {
    const update = db('wallets')
                      .where({ userId: id })
                      .increment('balance', query);
    return update;
  }

  public async withdrawWallets (id: string, query: number) {
    const update = db('wallets')
                      .where({ userId: id })
                      .decrement('balance', query);
    return update;
  }
}