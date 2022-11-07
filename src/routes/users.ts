import express from 'express';

const router = express.Router();

import { getUsers } from '../controller/users';

router.get('/api/user', getUsers)

export default router;
