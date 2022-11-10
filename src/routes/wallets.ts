import express from 'express';

const router = express.Router();

import { verifyToken } from '../middlewares/auth';
import { 
  checkBalance,
  makeDeposit, 
  makeWithdrawal, 
  makeTransfer, 
  getWallets 
} from '../controllers/wallet';

router.patch('/api/wallet/deposit/:id', verifyToken(), makeDeposit);

router.patch('/api/wallet/withdraw/:id', verifyToken(), makeWithdrawal);

router.patch('/api/wallet/transfer/:id', verifyToken(), makeTransfer);

router.get('/api/wallet/balance/:id', verifyToken(), checkBalance);

router.get('/api/wallet/', getWallets);

export default router;
