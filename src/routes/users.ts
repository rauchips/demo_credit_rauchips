import express from 'express';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

import { createUser, getUsers } from '../controllers/users';

router.post('/api/user', createUser);

router.get('/api/user', getUsers)

export default router;
