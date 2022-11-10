import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { Application, Request, Response } from 'express';


dotenv.config();

import { PORT, NODE_ENV } from './utils';
import usersRoute from './routes/users';
import walletsRoute from './routes/wallets';
import ErrorHandler from './errors/errorHandler';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(usersRoute);
app.use(walletsRoute);
app.use(ErrorHandler);
app.use("*", (req: Request, res: Response) => {
  return res.status(200).json({ 
    message: 'This is the base project visit the following endpoints',
    user: {
      'GET all users' : '/api/user',
      'POST new user - signup' : '/api/user/signup',
      'POST user - signin' : '/api/user/signin',

    },
    wallet: {
      'GET all wallets' : '/api/wallet',
      'GET wallet balance for user with id' : '/api/wallet/balance/:id',
      'PATCH make deposit' : '/api/wallet/deposit/:id',
      'PATCH make withdrawal' : '/api/wallet/withdraw/:id',
      'PATCH make transfer' : '/api/wallet/transfer/:id',

    }
  });
});

if (NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
}

export default app;