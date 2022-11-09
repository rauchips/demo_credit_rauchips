import express from 'express';

const router = express.Router();

import { veritfyToken } from '../middlewares/auth';
import { createUser, loginUser, getUsers } from '../controllers/users';

router.post('/api/user/signup', createUser);

router.post('/api/user/signin', veritfyToken(), loginUser);

router.get('/api/user/', getUsers);

export default router;
