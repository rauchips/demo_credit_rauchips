import express from 'express';

const router = express.Router();

import { veritfyToken } from '../middlewares/auth';
import { createUser, getUsers } from '../controllers/users';

router.post('/api/user/signup', createUser);

router.get('/api/user/login', veritfyToken(), getUsers)

export default router;
