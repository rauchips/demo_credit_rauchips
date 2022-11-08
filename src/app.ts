import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";


dotenv.config();

import { PORT } from './utils';
import usersRoute from './routes/users';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(usersRoute);

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: 'You are not authorize, kindly signup/login'});
  } else {
    next(err);
  }
});

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));