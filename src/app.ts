import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";


dotenv.config();

import { PORT } from './utils';
import usersRoute from './routes/users';
import walletsRoute from './routes/wallets';
import ErrorHandler from './errors/errorHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(usersRoute);
app.use(walletsRoute);
app.use(ErrorHandler);

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));