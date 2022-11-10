import express from 'express';

const router = express.Router();

import { verifyToken } from '../middlewares/auth';
import { createUser, loginUser, getUsers } from '../controllers/users';

router.post('/api/user/signup', createUser);

router.post('/api/user/signin', verifyToken(), loginUser);

router.get('/api/user/', getUsers);

export default router;
