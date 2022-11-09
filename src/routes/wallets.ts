import express from 'express';

const router = express.Router();

import { veritfyToken } from '../middlewares/auth';
import { checkBalance, makeDeposit, makeWithdrawal, makeTransfer, getWallets } from '../controllers/wallet';

router.patch('/api/wallet/deposit/:id', veritfyToken(), makeDeposit);

router.patch('/api/wallet/withdraw/:id', veritfyToken(), makeWithdrawal);

router.patch('/api/wallet/transfer/:id', veritfyToken(), makeTransfer);

router.get('/api/wallet/balance/:id', veritfyToken(), checkBalance);

router.get('/api/wallet/', getWallets)

export default router;
