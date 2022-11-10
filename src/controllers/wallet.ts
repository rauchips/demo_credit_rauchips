import { Request, Response, NextFunction } from "express";

import WalletService from '../modules/wallets/service';
import { ApiError } from '../errors/errors';

const walletService: WalletService = new WalletService();

// DEPOSIT INTO WALLET
export async function makeDeposit(req: Request, res:Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const { balance } = req.body;

    const sender = await walletService.filterWallets('userId', id);

    if (sender[0]) {
      if (balance > 0) {
        await walletService.depositWallets(id, balance);
        return res.status(200).json({
          deposit: true,
          message: 'Successfully added to wallet'
        })
      }
      
      return res.status(400).json(ApiError.BadRequest({
        deposit: false,
        message: 'Transaction failed, enter a valid amount' 
      }));
       
    }
    return res.status(400).json(ApiError.BadRequest({
      deposit: false,
      message: 'Transaction failed, unable to make deposit' }));
    
    
  } catch (error) {
    next(ApiError.InternalError(error));
  }
}

// WITHDRAW FROM WALLET
export async function makeWithdrawal(req: Request, res:Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const { balance } = req.body;

    const withdrawer = await walletService.filterWallets('userId', id);

    if (withdrawer[0] && withdrawer[0].balance > 0) {
      if (balance <= 0) {
        return res.status(400).json(ApiError.BadRequest({
          deposit: false,
          message: 'Transaction failed, enter a valid amount' 
        }));
      }
        await walletService.withdrawWallets(id, balance);
        return res.status(200).json({
          deposit: true,
          message: 'Successfully withdrawed from wallet'
        })
    }
    return res.status(400).json(ApiError.BadRequest({
      deposit: false,
      message: 'Transaction failed, unable to make withdrawal kindly top up your wallet' }));
    
  } catch (error) {
    next(ApiError.InternalError(error));
  }
}

// TRANSFER FUNDS BETWEEN TWO USERS
export async function makeTransfer(req: Request, res:Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const { userId, balance } = req.body;

    const sender = await walletService.filterWallets('userId', id)
    const receiver = await walletService.filterWallets('userId', userId)

    if (sender[0] && receiver[0]) {
      if (sender[0].balance > 0) {
        const withdraw = await walletService.withdrawWallets(id, balance);
        const deposit = await walletService.depositWallets(userId, balance);
        console.log(withdraw, deposit)

        return res.status(200).json({
          withdraw: true,
          deposit: true,
          message: 'Successfully transfered funds'
        });
      }
      return res.status(400).json(ApiError.BadRequest({
        withdraw: false,
        message: 'Transaction failed, you have insufficient funds kindly top up your wallet'
      }));
      
    }

    return res.status(400).json(ApiError.BadRequest({
      withdraw: false,
      deposit: false,
      message: 'Transaction failed, unable to make transfer' }));
    
  } catch (error) {
    next(ApiError.InternalError(error));
  }
}

// CHECK BALANCE OF WALLET
export async function checkBalance(req: Request, res:Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const wallet = await walletService.filterWallets('userId', id);

    wallet.length > 0 ?
    res.status(200).json(wallet) :
    res.status(400).json(ApiError.BadRequest('This user does not exist'))

  } catch (error) {
    next(ApiError.InternalError(error));
  }
}

// GET ALL WALLETS IN THE DATABASE
export async function getWallets(req: Request, res:Response, next: NextFunction) {
  try {
    const wallets = await walletService.getWallets()

    return res.status(200).json({
      count: wallets.length,
      data: wallets
    })

  } catch (error) {
    next(ApiError.InternalError(error));
  }
}