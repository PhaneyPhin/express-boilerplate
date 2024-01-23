import './bootstrap'
import "reflect-metadata"
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import { AuthMiddleware } from './middlewares/auth.middleware';
const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRouter)

app.use(AuthMiddleware)
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})